// Stock Market Portfolio

const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API key pk_3c7bffeb60374bc1b68729ed857e5b2a
// create call_api function
function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/'+ ticker + '/quote?token=pk_3c7bffeb60374bc1b68729ed857e5b2a', {json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
		if (res.statusCode === 200) {
			finishedAPI(body);
		};
	});
};


// Set Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
	call_api(function(doneAPI) {
		res.render('home', {
    	stock: doneAPI
    });
	}, "fb");
});

// Set handlebar index POST route
app.post('/', (req, res) => {
	call_api(function(doneAPI) {
		//posted_stuff = req.body.stock_ticker;
		res.render('home', {
    	stock: doneAPI
    });
	}, req.body.stock_ticker);
});

app.get('/about.html', (req, res) => {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server listening on port ' + PORT));
