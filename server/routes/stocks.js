const 	express = require('express'),
		stockSymbols = require('../symbols'),
		fetch = require('node-fetch'),
		router = express.Router();


const baseUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='
const apikey =  '&apikey=' + process.env.STOCKS_APIKEY;

// GET STOCK
router.get('/',(req, res) => {
	// only can get 5 stocks info at a time
	// need to create a finder algorithm to find first 5 desired stock symbols

	let symbols = stockSymbols.slice(0, 5);
	let urls = symbols.map(symbol => baseUrl + symbol + apikey);
	// put stock data into an array or object
	let stocks = urls.map(async url => {
		return await fetch(url)
		.then(response => response.json())
		.then(data => {
			return [data['Global Quote']['01. symbol'],data['Global Quote']['05. price']]
		})
		.catch(error => error)
	});
	
	async function getStocks() {
		return await Promise.all(stocks);
	}

	getStocks()
	.then(stocks => {
		res.send(stocks);
	})
});

module.exports = router;