var express = require('express');
var path = require('path');

var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');

var app = express();

app.set('view engine', 'jade');

var docDbClient = new DocumentDBClient(config.host, {
  masterKey: config.authKey
});

app.get('/', function (req, res) {
  res.send('Hello world!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  
});

module.exports = app;
