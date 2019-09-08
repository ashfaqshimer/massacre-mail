const express = require('express');
const router = new express.Router();
const Path = require('path-parser').default;
const _ = require('lodash');
const { URL } = require('url');
const requireAuth = require('../middleware/requireAuth');
const requireCredits = require('../middleware/requireCredits');
const Survey = require('../models/Survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

router.post('/api/surveys', requireAuth, requireCredits, async (req, res) => {
	const { title, body, subject, recipients } = req.body;

	const survey = new Survey({
		title,
		body,
		subject,
		recipients: recipients
			.split(',')
			.map(email => ({ email: email.trim() })),
		_user: req.user.id,
		dateSent: Date.now()
	});

	const mailer = new Mailer(survey, surveyTemplate(survey));

	try {
		await mailer.send();
		await survey.save();
		req.user.credits -= 1;
		const user = await req.user.save();

		res.send(user);
	} catch (err) {
		res.status(422).send(err);
	}
});

router.post('/api/surveys/webhooks', (req, res) => {
	const parser = new Path('/api/surveys/:surveyId/:choice');
	const events = req.body.map(event => {
		const match = parser.test(new URL(event.url).pathname);
		if (match) {
			return {
				email: event.email,
				surveyId: match.surveyId,
				choice: match.choice
			};
		}
	});
	const uniqueEvents = _.chain(events)
		.compact(events)
		.uniqBy('email', 'surveyId')
		.each(({ surveyId, email, choice }) => {
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: { email, responded: false }
					}
				},
				{
					$inc: { [choice]: 1 },
					$set: { 'recipients.$.responded': true },
					lastResponded: new Date()
				}
			).exec();
		})
		.value();

	console.log(uniqueEvents);
	res.send({});
});

router.get('/api/surveys', requireAuth, async (req, res) => {
	const surveys = await Survey.find({ _user: req.user.id }).select({
		recipients: false
	});

	res.send(surveys);
});

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
	res.send('Thanks for voting!');
});

module.exports = router;
