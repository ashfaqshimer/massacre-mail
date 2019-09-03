const mongoose = require('mongoose');
const { Schema } = mongoose;

mondule.exports = recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});
