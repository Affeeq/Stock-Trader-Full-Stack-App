const 	mongoose = require('mongoose');
// add passport local mongoose

const userSchema = new mongoose.Schema({
	email: { type: String, unique: true, required: true },
	password: String,
	username: String,
	funds: Number,
	portfolio: [
		{
			symbol: String,
			name: String,
			quantity: Number,
			boughtPrice: Number,
			currentPrice: Number
		}
	],
	userLog: [
		{
			isBought: {type: Boolean, default: true},
			symbol: String,
			quantity: Number,
			createdAt: { type: Date, default: Date.now },
			price: Number
		}
	]
});

module.exports = mongoose.model("User", userSchema);