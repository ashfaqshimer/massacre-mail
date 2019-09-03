const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
	'/auth/google/callback',
	passport.authenticate('google'),
	(req, res) => {
		res.redirect('/surveys');
	}
);

router.get('/api/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/api/current-user', (req, res) => {
	if (req.user) {
		return res.send(req.user);
	}
	res.status(401).send({ error: 'unauthorized' });
});

module.exports = router;
