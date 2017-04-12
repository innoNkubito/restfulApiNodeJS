//Require express server
var express = require("express");

//create app
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.json());

Genre = require('./models/genre.js');
Book = require('./models/book.js');

//folder to run index.html
//app.use(express.static('app'));
//app.use(express.methodOverride());

//Connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('NODE JS CRUD API !');
});

app.get('/apis/genres', function(req, res){

	Genre.getGenres(function(err, genres){

		if(err)
		{
			throw err;
		}
		
		res.json(genres);
	});

});

app.post('/apis/genres', function(req, res){

	var genre = req.body;

	Genre.addGenre(genre, function(err, genres){

		if(err)
		{
			throw err;
		}
		
		res.json(genre);
	});

});

app.put('/apis/genres/:_id', function(req, res){

	var id = req.params._id;
	var genre = req.body;

	Genre.updateGenre(id, genre, {},  function(err, genres){

		if(err)
		{
			throw err;
		}
		
		res.json(genre);
	});

});

// Delete genres

app.delete('/apis/genres/:_id', function(req, res){

	var id = req.params._id;

	Genre.deleteGenre(id, function(err, genres){

		if(err)
		{
			throw err;
		}
		
		//res.json(genre);
	});

});


app.get('/apis/books', function(req, res){

	Book.getBooks(function(err, books){

		if(err)
		{
			throw err;
		}
		
		res.json(books);
	});

});

app.get('/apis/books/:_id', function(req, res){

	Book.getBookById(req.params._id, function(err, book){

		if(err)
		{
			throw err;
		}
		
		res.json(book);
	});

});

// Add Book
app.post('/apis/books', function(req, res){

	var book = req.body;

	Book.addBook(book,function(err, book){

		if(err)
		{
			throw err;
		}
		
		res.json(book);
	});

});

//Update Book

app.put('/apis/books/:_id', function(req, res){

	var id = req.params._id;
	var book = req.body;

	Book.updateBook(id, book, {},  function(err, genres){

		if(err)
		{
			throw err;
		}
		
		res.json(book);
	});

});

// Delete genres

app.delete('/apis/books/:_id', function(req, res){

	var id = req.params._id;

	Book.deleteBook(id, function(err, genres){

		if(err)
		{
			throw err;
		}
		
		//res.json(genre);
		console.log("Deleted")
	});

});

//start the server
app.listen(3000,function(){
	console.log("Running on HTTP port 3000...");
});
