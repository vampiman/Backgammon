//TO DO: Moree than 5 pieces functionality (DONE)
//MORE THAN 5 PIECES AFTER CAPTURE REEEEEEEEEEEEEEEEEEEEEEEE (DONE)
//CAN'T SELECT NORMAL PIECE AFTER SELECTING A CAPTURED ONE
//WHITE CAPTURED MOVE + CHECK FOR CAPTURE AFTER MOVE (DONE)
//(COMPOSED MOVE) CAN CAPTURE ANOTHER PIECE (MEH)
//CAN ONLY DO ONE MOVE WHEN CAPTURED AND THERE ARE MORE THAN ONE CAPTURES, NOT A COMPOSED MOVE
//CHECK IF IN HOME AFTER MOVE (IMPORTANT) REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE (DONE)
//WHEN GETTING A POINT, MAKE SURE TO TAKE THE SMALLEST DICE POSSIBLE FOR THE POINT
//M
//DOUBLE MOVE (YEAH YEAH I AM DOING IT NOW GOOSH *sigh, here we go) (DONE, but not tested enough)

var whitePlaceHolders = [];
var blackPlaceHolder;

///////////////NOT TESTED YET/////////////////
function capWhite(){
    //Create the websocket message
    var scoreWhite = Messages.O_WHITE_TO_WIN;
    scoreWhite.pieceID = selectedWhite;
    scoreWhite.endTurn = false;

    document.getElementById('whitePoint').style.display = 'none';

    var x = document.getElementsByClassName("future");

    if(tile[whitePieces[selectedWhite].place].pieces <= 5){
        var old = document.getElementsByClassName("tile" + whitePieces[selectedWhite].place + "-" + tile[whitePieces[selectedWhite].place].pieces);
        old[0].removeChild(old[0].childNodes[0]); //Remove the old piece
    }
    
    //CHECK IF ANY 5th piece has to be changed back
    for(var i = 0; i < whitePieces[selectedWhite].options.length;i++){
        if(whitePieces[selectedWhite].options[i] != 42){
            if(tile[whitePieces[selectedWhite].options[i]].pieces >= 5){
                    //CHANGE PIECE BACK
                    var fifth = document.getElementsByClassName('tile' + whitePieces[selectedWhite].options[i] + '-5')[0].firstChild;
                    fifth.style.opacity = '1';
                    fifth.setAttribute('onclick', 'selectWhitePiece(this)');
            }
        }
    }


    for(var i = 0; i < x.length;i++){
        x[i].parentNode.removeChild(x[i]);
        i--;
    }

    var counter = document.getElementById("count" + whitePieces[selectedWhite].place);
    var number = tile[whitePieces[selectedWhite].place].pieces - 1;
    document.getElementById("count" + whitePieces[selectedWhite].place).innerHTML = number; 
                
    
    if(dices.length == 2){
                   if(whitePieces[selectedWhite].options[0] == 42){
                        resetOptions();
                        dices.splice(0,1);
                            if(homeMovesWhite(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'black';
                                scoreWhite.endTurn = true;
                            }
                    }
                    else if(whitePieces[selectedWhite].options[1] == 42){
                        resetOptions();
                        dices.splice(1,1);
                            if(homeMovesWhite(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'black';
                                scoreWhite.endTurn = true;
                            }

                    }
                    else {
                        resetOptions();
                        rolledDice =  false;
                        turn = 'black';
                        scoreWhite.endTurn = true;
                        
                    }
                }
                else{
                    resetOptions();
                    rolledDice = false;
                    turn = 'black';
                    scoreWhite.endTurn = true;
                }


    whiteToWin(selectedWhite);

    //Send the message to the server
    socket.send(JSON.stringify(scoreWhite));
    
    selectedWhite = -1;
}
///////////////NOT TESTED YET/////////////////////
function capBlack(){
    //Create the websocket message
    var scoreBlack = Messages.O_BLACK_TO_WIN;
    scoreBlack.pieceID = selectedBlack - 15;
    scoreBlack.endTurn = false;


    document.getElementById('blackPoint').style.display = 'none';

    var x = document.getElementsByClassName("future");

    if(tile[blackPieces[selectedBlack - 15].place].pieces <= 5){
        var old = document.getElementsByClassName("tile" + blackPieces[selectedBlack - 15].place + "-" + tile[blackPieces[selectedBlack - 15].place].pieces);
        old[0].removeChild(old[0].childNodes[0]); //Remove the old piece
    }
    
    //CHECK IF ANY 5th piece has to be changed back
    for(var i = 0; i < blackPieces[selectedBlack - 15].options.length;i++){
        if(blackPieces[selectedBlack - 15].options[i] != 42){
            if(tile[blackPieces[selectedBlack - 15].options[i]].pieces >= 5){
                    //CHANGE PIECE BACK
                    var fifth = document.getElementsByClassName('tile' + blackPieces[selectedBlack - 15].options[i] + '-5')[0].firstChild;
                    fifth.style.opacity = '1';
                    fifth.setAttribute('onclick', 'selectBlackPiece(this)');
            }
        }
    }


    for(var i = 0; i < x.length;i++){
        x[i].parentNode.removeChild(x[i]);
        i--;
    }

    var counter = document.getElementById("count" + blackPieces[selectedBlack - 15].place);
    var number = tile[blackPieces[selectedBlack - 15].place].pieces - 1;
    document.getElementById("count" + blackPieces[selectedBlack - 15].place).innerHTML = number; 
                
    
    if(dices.length == 2){
                   if(blackPieces[selectedBlack - 15].options[0] == 42){
                        resetOptions();
                        dices.splice(0,1);
                            if(homeMovesBlack(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'white';
                                scoreBlack.endTurn = true;
                            }
                    }
                    else if(blackPieces[selectedBlack - 15].options[1] == 42){
                        resetOptions();
                        dices.splice(1,1);
                            if(homeMovesBlack(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'white';
                                scoreBlack.endTurn = true;
                            }

                    }
                    else {
                        resetOptions();
                        rolledDice =  false;
                        turn = 'white';
                        scoreBlack.endTurn = true;
                    }
                }
                else{
                    resetOptions();
                    rolledDice = false;
                    turn = 'white';
                    scoreBlack.endTurn = true;
                }


    blackToWin(selectedBlack);

    //Send the message to the server
    socket.send(JSON.stringify(scoreBlack));

    selectedBlack = -1;
}














