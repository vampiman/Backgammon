var express = require('express');
var http = require('http');
var router = require('./routes/routes');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/menu', router);
app.get('/game', router);

http.createServer(app).listen(3000);