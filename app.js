//Code to initialize a basic app server
var express = require('express');
var app = express();
var path = require("path");

app.set('view engine', 'html');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);