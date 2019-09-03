const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport');

// DB Config
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const app = express();

// Authenitcation configuration
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [process.env.COOKIE_KEY]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/auth');
const billingRoutes = require('./routes/billing');

app.use(express.json()); // Parses the body of requests to json
app.use(authRoutes);
app.use(billingRoutes);

// Check to see if in production, add a handler to serve up js assets
if (process.env.ENVIRONMENT === 'prod') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../', 'client', 'build', 'index.html')
		);
	});
}

// Server configuration
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log('App listening on port', PORT);
});
