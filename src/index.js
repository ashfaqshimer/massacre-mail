const express = require('express');
const mongoose = require('mongoose');
require('./services/passport');

// DB Config
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

// models

// Routes
const authRoutes = require('./routes/auth');

const app = express();

app.use(authRoutes);

// Server configuration
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log('App listening on port', PORT);
});
