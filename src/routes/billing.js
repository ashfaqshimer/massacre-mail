const express = require('express');
const passport = require('passport');
const router = new express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const auth = require('../middleware/auth');

router.post('/api/stripe', auth, async (req, res) => {
	try {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
