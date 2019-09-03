const express = require('express');
const router = new express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireCredits = require('../middleware/requireCredits');
const Survey = require('../models/Survey');

router.get('/api/surveys', requireAuth, requireCredits, (req, res) => {
	const { title, body, subject, recipients } = req.body;

	const survey = new survey({
		title,
		body,
		subject,
		recipients: recipients
			.split(',')
			.map(email => ({ email: email.trim() })),
		_user: req.user.id,
		dateSent: Date.now()
	});
});

module.exports = router;
