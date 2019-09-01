const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

passport.serializeUser((user, cb) => {
	cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
	try {
		const user = await User.findById(id);
		cb(null, user);
	} catch (error) {
		cb(error, null);
	}
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback'
		},
		async (accessToken, refreshToken, profile, cb) => {
			const userId = profile.id;
			try {
				const existingUser = await User.findOne({ userId });
				if (!existingUser) {
					const newUser = new User({ userId });
					const response = await newUser.save();
					cb(null, response);
				}
			} catch (error) {
				cb(error, null);
				console.log(error);
			}
		}
	)
);
