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

app.use(authRoutes);

// Server configuration
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log('App listening on port', PORT);
});
