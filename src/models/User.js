const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		googleId: String,
		credits: { type: Number, default: 0 }
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
