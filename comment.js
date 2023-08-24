// Create web server 
// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set up port
var port = process.env.PORT || 8080;

// Set up template engine
app.set('view engine', 'ejs');

// Set up static files
app.use(express.static('./public'));

// Set up body parser;
app.use(bodyParser.json());

// Load comment.json
var comments = require('./comment.json');

// GET request
app.get('/', function(req, res) {
	res.render('index', {comments: comments});
});

// POST request
app.post('/', urlencodedParser, function(req, res) {
	var newComment = {
		name: req.body.name,
		comment: req.body.comment
	};
	comments.push(newComment);
	fs.writeFile('./comment.json', JSON.stringify(comments), function(err) {
		if (err) throw err;
		console.log('Saved!');
	});
	res.render('index', {comments: comments});
});

// Start server
app.listen(port, function() {
	console.log('Server is running on port ' + port);
});