const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', {
    	stuff: "This is stuff"
    });
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server listening on port ' + PORT));
