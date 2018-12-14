var express = require('express');
var http = require('http');
var router = require('./routes/routes');
var path = require('path');
var websocket = require('ws');
var Game = require('./game.js');
var Messages = require('./public/scripts/messages');



var app = express();

var game1 = new Game();

var IDGenerator = 0;
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
        var beginMsg = Messages.O_BEGIN;
        beginMsg.data = "Begin";
        
        console.log(`Player 2 from game ${games.length-1} is ready`);
        games[games.length - 1].socket1.send(JSON.stringify(beginMsg));
    }

    ws.on('message',(message) => {
        var msg = JSON.parse(message);
        var notFound = true;
        var id = 0;
        
        //HANDLE ROLLED DICE
        if(msg.type == Messages.T_ROLLED_DICE){
            while(notFound){
                if(games[id].socket1 == ws){
                    if(msg.pieceID != null)
                        console.log(`Player1 from Game ${id} just rolled ${msg.data}!`);
                    else
                        console.log('Player1 can\'t move anywhere');
                    games[id].socket2.send(message);
                    notFound = false;
                }
                else if(games[id].socket2 == ws){
                    console.log(`Player2 from Game ${id} just rolled ${msg.data}!`)
                    games[id].socket1.send(message);
                    notFound = false;
                }
                id++;
            }
        }
        //HANDLE WHITE MOVE
        else if(msg.type == Messages.T_WHITE_MOVE || msg.type == Messages.T_WHITE_CAPTURED_MOVE){
            while(notFound){
                if(games[id].socket1 == ws){
                    if(msg.pieceID != null)
                        console.log(`Player1 from Game ${id} just moved piece ${msg.pieceID} to tile ${msg.target}!`);
                    else
                        console.log('Player1 can\'t move anywhere');
                    if(msg.endTurn == true)
                        console.log('Player1 ended his turn');
                    games[id].socket2.send(message);
                    notFound = false;
                }
                else if(games[id].socket2 == ws){
                    console.log(`Player2 from Game ${id} just moved piece ${msg.pieceID} to tile ${msg.target}!`);
                    games[id].socket1.send(message);
                    notFound = false;
                }
                id++;
            }
        }
        //HANDLE BLACK MOVE
        else if(msg.type == Messages.T_BLACK_MOVE || msg.type == Messages.T_BLACK_CAPTURED_MOVE){
            while(notFound){
                if(games[id].socket1 == ws){
                    if(msg.pieceID != null)
                        console.log(`Player1 from Game ${id} just moved piece ${msg.pieceID} to tile ${msg.target}!`);
                    else
                        console.log('Player1 can\'t move anywhere');
                    if(msg.endTurn == true)
                        console.log('Player1 ended his turn');
                    games[id].socket2.send(message);
                    notFound = false;
                }
                else if(games[id].socket2 == ws){
                    if(msg.pieceID != null)
                    console.log(`Player2 from Game ${id} just moved piece ${msg.pieceID} to tile ${msg.target}!`);
                    else
                        console.log('Player1 can\'t move anywhere');
                    games[id].socket1.send(message);
                    notFound = false;
                }
                id++;
            }
        }
        //HANDLE WHITE POINT
        else if(msg.type == Messages.T_WHITE_TO_WIN){
            while(notFound){
                if(games[id].socket1 == ws){
                    games[id].points1++;
                    if(msg.pieceID != null)
                        console.log(`Player1 from Game ${id} just scored a point`);
                    else
                        console.log('Player1 can\'t move anywhere');
                    if(msg.endTurn == true)
                        console.log('Player1 ended his turn');
                    games[id].socket2.send(message);
                    notFound = false;
                    if(games[id].points1 == 15)
                        console.log('Player 1 just won');
                }
                else if(games[id].socket2 == ws){
                    console.log(`Player2 from Game ${id} just scored a point`);
                    games[id].socket1.send(message);
                    notFound = false;
                }
                id++;
            }
        }
        //HANDLE BLACK POINT
        else if(msg.type == Messages.T_BLACK_TO_WIN){
            while(notFound){
                if(games[id].socket1 == ws){
                    games[id].points1++;
                    console.log(`Player1 from Game ${id} just scored a point`);
                    if(msg.endTurn == true)
                        console.log('Player1 ended his turn');
                    games[id].socket2.send(message);
                    notFound = false;
                    
                }
                else if(games[id].socket2 == ws){
                    console.log(`Player2 from Game ${id} just scored a point`);
                    if(msg.endTurn == true)
                        console.log('Player2 ended his turn');
                    games[id].socket1.send(message);
                    notFound = false;
                    if(games[id].points1 == 15)
                        console.log('Player 2 just won');
                }
                id++;
            }
        }
        
    });

    ws.on('close',function(){
        var notFound = true;
        var id = 0;
        var endMsg = Messages.O_GAME_CANCELLED;
            while(notFound){
                if(games[id].socket1 == ws){
                    games[id].points1++;
                    console.log('Player1 just left');
                    endMsg.data = 'Player1 just left';
                    games[id].socket2.send(JSON.stringify(endMsg));
                    games.splice(id,1);
                    notFound = false;
                    
                }
                else if(games[id].socket2 == ws){
                    console.log(`Player2 from Game ${id} just scored a point`);
                    if(msg.endTurn == true)
                        console.log('Player2 ended his turn');
                    games[id].socket1.send(message);
                    notFound = false;
                    if(games[id].points1 == 15)
                        console.log('Player 2 just won');
                }
                id++;
            }
    });

   if(games[games.length - 1].players === 2)
    games.push(new Game()); 
});



