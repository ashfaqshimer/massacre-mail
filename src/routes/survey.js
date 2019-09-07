const express = require('express');
const router = new express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireCredits = require('../middleware/requireCredits');
const Survey = require('../models/Survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

router.get('/api/feedback', (req, res) => {
	res.send('Thanks for voting!');
});

router.post('/api/surveys', requireAuth, requireCredits, async (req, res) => {
	console.log('Request to surveys');
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

module.exports = router;
