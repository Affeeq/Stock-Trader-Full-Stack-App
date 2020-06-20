const 	mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	symbol: String,
	price: Number,
	name: String
	// isIncreasing: {type: Boolean, default: true} - need to check if able to get history
});

module.exports = mongoose.model("Stock", stockSchema);