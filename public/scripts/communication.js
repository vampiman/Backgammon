//TO HANDLE NO POSSIBLE MOVES CASE


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
    //CAPTURED WHITE MOVED
    else if(fromServer.type == Messages.T_WHITE_CAPTURED_MOVE){
        document.getElementById('rolled').innerHTML = `Opponent just moved piece ${fromServer.pieceID} to tile ${fromServer.target}!`;

        if(fromServer.capture != null)
            updateCapture(fromServer.target);
        
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
        
        updateBlackCapturedMove(fromServer.pieceID, fromServer.target);
        
        if(fromServer.endTurn == true){
            document.getElementsByClassName('roll')[0].style.visibility = 'visible';
            turn = 'white';
        }
    }
    //WHITE CAPPED PIECE
    else if(fromServer.type == Messages.T_WHITE_TO_WIN){
        document.getElementById('rolled').innerHTML = `Opponent just capped piece ${fromServer.pieceID}!`;

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

        removeBlackPiece(fromServer.pieceID);

        if(blackPoints == 15)
            document.getElementById('rolled').innerHTML = `Black just won`;
        
        if(fromServer.endTurn == true){
            document.getElementsByClassName('roll')[0].style.visibility = 'visible';
            turn = 'white';
        }
    }
}