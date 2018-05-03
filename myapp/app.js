// const express = require('express');
// const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const app = express();
// const port = 9000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static('public'));

// MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {
// 	if (err) return console.log(err);
// 	db = database;
// 	app.listen(port, () => {
// 		console.log(`Listening on port ${port}!`);
// 	});
// });

// app.get('*', (req, res) => {
// 	res.sendFile(__dirname + '/public/index.html');
// });

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 9000;

// make sure this line always appears before any routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const mongoose = require('mongoose');
//const mongoUri = 'mongodb://localhost/myapp';
//const mongoUri = 'mongodb://devereld:dd2345@ds015730.mlab.com:15730/recipes-dd';
const mongoUri = 'mongodb://lcorrea:lc12345!@ds239359.mlab.com:39359/bcl';
mongoose.connect(mongoUri);

const recipeModels = require('./rest-api/src/recipe.model');
const routes = require('./rest-api/src/recipe.routes');
const appRoutes = routes(app);

app.get('/', function(req, res) {
    //res.send('Hey there');
    res.sendFile(__dirname + '/public/index.html');
});



app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3001);
console.log('Server running at http://localhost:3001/');




