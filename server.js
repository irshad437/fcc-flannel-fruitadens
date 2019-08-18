'use strict';

var express = require('express');
var bodyParser = require('body-parser')

// include db
require('./db')
// require('./models')
var createAndSaveURL = require('./helper').createAndSaveURL
var fetchAndVisitShortUrl = require('./helper').fetchAndVisitShortUrl

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/new', function(req, res){
  createAndSaveURL(req, res)
})

app.get('/api/shorturl/:_id', function(req, res){
  fetchAndVisitShortUrl(req, res)
})

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});