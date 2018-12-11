
var socket = new WebSocket('ws://localhost:3000');
            
socket.onmessage = function(event){
    var fromServer = JSON.parse(event.data);

    //THE FIRST PLAYER GETS THIS
    if(fromServer.type == Messages.T_BEGIN){
        document.getElementById('message').innerHTML = fromServer.data;
        document.getElementsByClassName('roll')[0].style.visibility = 'visible';
    }
    //DICE OF THE OPPONENT
    else if(fromServer.type == Messages.T_ROLLED_DICE){
        document.getElementById('rolled').innerHTML = `Opponent rolled ${fromServer.data}`;
    } 
    //WHITE MOVED
    else if(fromServer.type == Messages.T_WHITE_MOVE){
        document.getElementById('rolled').innerHTML = `Opponent just moved piece ${fromServer.pieceID} to tile ${fromServer.target}!`;

        if(fromServer.capture != null)
            updateCapture(fromServer.target);
        updateWhiteMove(fromServer.pieceID, fromServer.target);
        
        if(fromServer.endTurn == true){
            document.getElementsByClassName('roll')[0].style.visibility = 'visible';
            turn = 'black';
        }
    }
    //BLACK MOVED
    else if(fromServer.type == Messages.T_BLACK_MOVE){
        document.getElementById('rolled').innerHTML = `Opponent just moved piece ${fromServer.pieceID} to tile ${fromServer.target}!`;

        if(fromServer.capture != null)
            updateCapture(fromServer.target);

        updateBlackMove(fromServer.pieceID, fromServer.target);
        if(fromServer.endTurn == true){
            document.getElementsByClassName('roll')[0].style.visibility = 'visible';
            turn = 'white';
        }
        
    }
}