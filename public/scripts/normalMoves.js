function afterWhiteMove(el){
            if(turn == 'white'){
                //Create element to send
                var whiteMove = Messages.O_WHITE_MOVE;
                whiteMove.capture = null;
                whiteMove.endTurn = false;
               


                //Remember the place where the piece was
                var oldPlace = whitePieces[selectedWhite].place;
                //Get the parent class name
                var parentClass = el.parentElement.className;
                parentClass = parentClass.replace("tile","");//Parsing class name
                var arr = parentClass.split("-");
                //ONLY MODIFY THE OLD PIECE IF THERE ARE NO MORE THAT 4 PIECES THERE
                if(tile[whitePieces[selectedWhite].place].pieces <= 5){
                    var old = document.getElementsByClassName("tile" + whitePieces[selectedWhite].place + "-" + tile[whitePieces[selectedWhite].place].pieces);
                    old[0].removeChild(old[0].childNodes[0]); //Remove the old piece
                }
                var x = document.getElementsByClassName("future");
                //Create a new image of the deleted old piece
                var img = document.createElement("img");
                img.setAttribute('onclick','selectWhitePiece(this)');
                img.src = "stylesheets/images/whitePiece.png";
                img.className = "white";
                img.id = selectedWhite;
                //Append it to the selected future move and check capture
                if(whiteCaptureAnything(selectedWhite,arr[0]) == true){
                    whiteMove.capture = arr[0];
                    capture(arr[0]);
                    var targetTile = document.getElementsByClassName('tile' + arr[0] +'-1');
                    targetTile[0].removeChild(targetTile[0].firstChild);
                    targetTile[0].appendChild(img);
                    
                    //Add captured on board and increment counter
                    if(capturedBlack.length < 2){
                    var capturedSpot = document.getElementsByClassName('capturedBlackSpot');
                    
                    var imgCapture = document.createElement("img");
                    imgCapture.setAttribute('onclick','selectCapturedBlack(this)');
                    imgCapture.src = "stylesheets/images/blackPiece.png";
                    imgCapture.className = "capturedBlack";
                    capturedSpot[0].appendChild(imgCapture);
                    
                    }
                    var capturedCounter = document.getElementsByClassName('capturedBlackCounter');
                    document.getElementById('blackCaptureCount').innerHTML = capturedBlack.length;
                }
                else if(el.className == 'white'){
                    if(el.id == tile[whitePieces[el.id].place].objects[4]){
                    el.className = 'white';
                    el.setAttribute('onclick', 'selectWhitePiece(this)');
                    el.style.opacity = '1';
                    }
                } 
                else el.parentNode.appendChild(img);
                
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
                //Fix the counters
                var counter = document.getElementById("count" + whitePieces[selectedWhite].place);
                var number = tile[whitePieces[selectedWhite].place].pieces - 1;
                document.getElementById("count" + whitePieces[selectedWhite].place).innerHTML = number; 

                //Update message info
                whiteMove.pieceID = selectedWhite;
                whiteMove.target = arr[0];
                //Update data
                whitePieces[selectedWhite].move((whitePieces[selectedWhite].place - arr[0])*-1);
                
                document.getElementById("count" + whitePieces[selectedWhite].place).innerHTML = tile[whitePieces[selectedWhite].place].pieces;
                
                //Switch turns or next move
                resetOptions();
                var status = checkWhiteStatus();
                if(dices.length == 2){
                    if(dices[0] + dices[1] == (oldPlace - arr[0])*-1){
                        rolledDice = false;
                        turn = 'black';
                        whiteMove.endTurn = true;
                    }
                    else if(dices[0] == (oldPlace - arr[0])*-1){
                        dices.splice(0,1);
                        if(status == 'normal')
                            if(normalMovesWhite(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'black';
                                whiteMove.pieceID = null;
                                whiteMove.endTurn = true;
                            }
                        if(status == 'home')
                            if(homeMovesWhite(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'black';
                                whiteMove.pieceID = null;
                                whiteMove.endTurn = true;
                            }

                    }
                    else {
                        dices.splice(1,1);
                        if(status == 'normal')
                            if(normalMovesWhite(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'black';
                                whiteMove.pieceID = null;
                                whiteMove.endTurn = true;
                            }
                        if(status == 'home')
                            if(homeMovesWhite(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'black';
                                whiteMove.pieceID = null;
                                whiteMove.endTurn = true;
                            }
                        
                    }
                }
                else{
                    rolledDice = false;
                    turn = 'black';
                    whiteMove.endTurn = true;
                }
                
                
                //Send update to server
                socket.send(JSON.stringify(whiteMove));
                selectedWhite = -1;
                document.getElementById('whitePoint').style.display = 'none';
                
                
            }
            else
                alert('Not your turn boi!');
}


/////////////NOT TESTED YET///////////////////
function afterBlackMove(el){
            if(turn == 'black'){
                //Create element to send
                var blackMove = Messages.O_BLACK_MOVE;

                //Reset data to avoid conflicts
                blackMove.capture = null;
                blackMove.endTurn = false;

                //Remember the place where the piece was
                oldPlace = blackPieces[selectedBlack - 15].place;
                //Get the parent class name
                var parentClass = el.parentElement.className;
                parentClass = parentClass.replace("tile","");//Parsing class name
                var arr = parentClass.split("-");
                if(tile[blackPieces[selectedBlack - 15].place].pieces <= 5){
                var old = document.getElementsByClassName("tile" + blackPieces[selectedBlack - 15].place + "-" + tile[blackPieces[selectedBlack - 15].place].pieces);
                old[0].removeChild(old[0].childNodes[0]); //Remove the old piece
                }
                var x = document.getElementsByClassName("future");
                //Create a new image of the deleted old piece
                var img = document.createElement("img");
                img.setAttribute('onclick','selectBlackPiece(this)');
                img.src = "stylesheets/images/blackPiece.png";
                img.className = "black";
                img.id = selectedBlack - 15;

                //Append it to the selected future move
                if(blackCaptureAnything(selectedBlack,arr[0]) == true){
                    blackMove.capture = arr[0];
                    capture(arr[0]);
                    var targetTile = document.getElementsByClassName('tile' + arr[0] +'-1');
                    targetTile[0].removeChild(targetTile[0].firstChild);
                    targetTile[0].appendChild(img);
                    
                    //Add captured on board and increment counter
                    if(capturedWhite.length < 2){
                    var capturedSpot = document.getElementsByClassName('capturedWhiteSpot');
                    
                    var imgCapture = document.createElement("img");
                    imgCapture.setAttribute('onclick','selectCapturedWhite(this)');
                    imgCapture.src = "stylesheets/images/whitePiece.png";
                    imgCapture.className = "capturedWhite";
                    capturedSpot[0].appendChild(imgCapture);
                    
                    }
                    var capturedCounter = document.getElementsByClassName('capturedWhiteCounter');
                    document.getElementById('whiteCaptureCount').innerHTML = capturedWhite.length;
                }
                else if(el.className == 'black'){
                    if(el.id == tile[blackPieces[el.id].place].objects[4] - 15){
                    el.className = 'black';
                    el.setAttribute('onclick', 'selectBlackPiece(this)');
                    el.style.opacity = '1';
                    }
                } 
                else el.parentNode.appendChild(img);

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
                //Fix the counters
                var counter = document.getElementById("count" + blackPieces[selectedBlack - 15].place);
                var number = tile[blackPieces[selectedBlack - 15].place].pieces - 1;
                document.getElementById("count" + blackPieces[selectedBlack - 15].place).innerHTML = number; 
                
                //Update message data
                blackMove.pieceID = selectedBlack - 15;
                blackMove.target = arr[0];
                //Update data
                blackPieces[selectedBlack - 15].move(arr[0] - blackPieces[selectedBlack - 15].place);
                
                document.getElementById("count" + blackPieces[selectedBlack - 15].place).innerHTML = tile[blackPieces[selectedBlack - 15].place].pieces;
                
                //Switch turns or next move
                resetOptions();
                var status = checkBlackStatus();
                if(dices.length == 2){
                    if(dices[0] + dices[1] == (oldPlace - arr[0])*-1){
                        rolledDice = false;
                        turn = 'white';
                        blackMove.endTurn = true;
                    }
                    else if(dices[0] == (oldPlace - arr[0])*-1){
                        dices.splice(0,1);
                        if(status == 'normal')
                            if(normalMovesBlack(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'white';
                                blackMove.pieceID = null;
                                blackMove.endTurn = true;
                            }
                        if(status == 'home')
                            if(homeMovesBlack(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'white';
                                blackMove.pieceID = null;
                                blackMove.endTurn = true;
                            }

                    }
                    else {
                        dices.splice(1,1);
                        if(status == 'normal')
                            if(normalMovesBlack(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'white';
                                blackMove.pieceID = null;
                                blackMove.endTurn = true;
                            }
                        if(status == 'home')
                            if(homeMovesBlack(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'white';
                                blackMove.pieceID = null;
                                blackMove.endTurn = true;
                            }
                        
                    }
                }
                else{
                    rolledDice = false;
                    turn = 'white';
                    blackMove.endTurn = true;
                }
                

                //Send update to server
                socket.send(JSON.stringify(blackMove));
                //Unselect black
                selectedBlack = -1;
                //Disable the point cap button
                document.getElementById('blackPoint').style.display = 'none';
                
                
            }
            else
                alert('Not your turn boi!');
}