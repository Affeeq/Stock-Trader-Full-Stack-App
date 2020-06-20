const 	express = require('express'),
		stocks = require('../stocksDesc'),
		fetch = require('node-fetch'),
		router = express.Router();


const baseUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='
const apikey =  '&apikey=' + process.env.STOCKS_APIKEY;

// GET STOCK
router.get('/',(req, res) => {
	let data = stocks.splice(0,5);
	res.send(data);
});

module.exports = router;