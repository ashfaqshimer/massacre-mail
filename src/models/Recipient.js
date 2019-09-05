const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});
