//TO HANDLE NO POSSIBLE MOVES CASE


var socket = new WebSocket('ws://localhost:3000');
            
socket.onmessage = function(event){
    var fromServer = JSON.parse(event.data);

    //THE FIRST PLAYER GETS THIS
    if(fromServer.type == Messages.T_BEGIN){
        document.getElementById('overlay').onclick = function(){document.getElementById('overlay').style.display = 'none';};
        document.getElementById('greetings').innerHTML = fromServer.data;
        document.getElementsByClassName('roll')[0].style.visibility = 'visible';
    }
    else if(fromServer.type == Messages.T_WAITING_FOR_OPPONENT) {
        document.getElementById('greetings').innerHTML = fromServer.data;
    }
    else if(fromServer.type == Messages.T_OPPONENT_FOUND) {
        document.getElementById('overlay').onclick = function(){document.getElementById('overlay').style.display = 'none';};
        document.getElementById('greetings').innerHTML = fromServer.data;
    }
    //DICE OF THE OPPONENT
    else if(fromServer.type == Messages.T_ROLLED_DICE){
        if(fromServer.data != null)
            document.getElementById('rolled').innerHTML = `Opponent rolled ${fromServer.data}`;
        else{
            if(turn == 'white')
                turn = 'black';
            else
                turn = 'white';
            
            document.getElementsByClassName('roll')[0].style.visibility = 'visible';
        }
    } 
    //WHITE MOVED
    else if(fromServer.type == Messages.T_WHITE_MOVE){
        document.getElementById('rolled').innerHTML = `Opponent just moved piece ${fromServer.pieceID} to tile ${fromServer.target}!`;

        if(fromServer.capture != null)
            updateCapture(fromServer.target);

        if(fromServer.pieceID != null)
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

        if(fromServer.pieceID != null)
            updateBlackMove(fromServer.pieceID, fromServer.target);

        if(fromServer.endTurn == true){
            document.getElementsByClassName('roll')[0].style.visibility = 'visible';
            turn = 'white';
        }
        
    }
    //CAPTURED WHITE MOVED
    else if(fromServer.type == Messages.T_WHITE_CAPTURED_MOVE){
        document.getElementById('rolled').innerHTML = `Opponent just moved piece ${fromServer.pieceID} to tile ${fromServer.target}!`;

        if(fromServer.capture != null)
            updateCapture(fromServer.target);
        
        if(fromServer.pieceID != null)
            updateWhiteCapturedMove(fromServer.pieceID, fromServer.target);
        
        if(fromServer.endTurn == true){
            document.getElementsByClassName('roll')[0].style.visibility = 'visible';
            turn = 'black';
        }
    }
    //CAPTURED BLACK MOVED
    else if(fromServer.type == Messages.T_BLACK_CAPTURED_MOVE){
        document.getElementById('rolled').innerHTML = `Opponent just moved piece ${fromServer.pieceID} to tile ${fromServer.target}!`;

        if(fromServer.capture != null)
            updateCapture(fromServer.target);
        
        if(fromServer.pieceID != null)
            updateBlackCapturedMove(fromServer.pieceID, fromServer.target);
        
        if(fromServer.endTurn == true){
            document.getElementsByClassName('roll')[0].style.visibility = 'visible';
            turn = 'white';
        }
    }
    //WHITE CAPPED PIECE
    else if(fromServer.type == Messages.T_WHITE_TO_WIN){
        document.getElementById('rolled').innerHTML = `Opponent just capped piece ${fromServer.pieceID}!`;

        if(fromServer.pieceID != null)
            removeWhitePiece(fromServer.pieceID);

        if(whitePoints == 15)
            document.getElementById('rolled').innerHTML = `White just won`;
        
        if(fromServer.endTurn == true){
            document.getElementsByClassName('roll')[0].style.visibility = 'visible';
            turn = 'black';
        }
    }
    //BLACK CAPPED PIECE
    else if(fromServer.type == Messages.T_BLACK_TO_WIN){
        document.getElementById('rolled').innerHTML = `Opponent just capped piece ${fromServer.pieceID}!`;

        if(fromServer.pieceID != null)
            removeBlackPiece(fromServer.pieceID);

        if(blackPoints == 15)
            document.getElementById('rolled').innerHTML = `Black just won`;
        
        if(fromServer.endTurn == true){
            document.getElementsByClassName('roll')[0].style.visibility = 'visible';
            turn = 'white';
        }
    }
}