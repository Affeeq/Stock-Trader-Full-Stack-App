require('dotenv').config();

const 	express = require('express'),
		bodyParser = require('body-parser'),
		cors = require('cors'),
		mongoose = require('mongoose'),
		app = express();

// require routes
const index = require('./routes/index');
const stocks = require('./routes/stocks');

// mongoose config
// process.env.DATABASEURL || 
mongoose.set('useUnifiedTopology', true);
const dbUrl = "mongodb://localhost:27017/stock_trader_full_stack"
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log(`Connected to ${dbUrl}`);
}).catch(err => {
	console.log("ERROR", err.message);
});
mongoose.set('useFindAndModify', false);

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Handle production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(__dirname + '/public/'));

	// Handle SPA
	app.get(/.*/, (req, res) => {
		res.sendFile(__dirname + '/public/index.html');
	});
}

// routes config
app.use('/', index);
app.use('/stocks', stocks);

// app listen
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started in port ${port}`));