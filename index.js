var express = require('express');
var http = require('http');
var router = require('./routes/routes');
var path = require('path');
var websocket = require('ws');
var Game = require('./game.js');

var app = express();

var game1 = new Game();

var connections = [];
var games = [game1];

app.use(express.static(path.join(__dirname, 'public')));



app.get('/menu', router);
app.get('/game', router);

var server = http.createServer(app);

server.listen(3000, '0.0.0.0');

const wss = new websocket.Server({ server });

wss.on('connection',(ws) => {
    if(games[games.length - 1].players === 0){
        games[games.length - 1].player1(ws);
        ws.send('Waiting for another player');
        console.log(`Player 1 from game ${games.length-1} is ready`);
    } else if(games[games.length - 1].players === 1){
        games[games.length - 1].player2(ws);
        ws.send('Opponent found, let the match begin!');
        console.log(`Player 2 from game ${games.length-1} is ready`);
        games[games.length - 1].ID1.send('Opponent found, let the match begin!');
    }

   if(games[games.length - 1].players === 2)
    games.push(new Game()); 
});



