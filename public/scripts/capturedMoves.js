
////////////////////TO TEST/////////////////////////
function afterWhiteCapturedMove(el) {
     //Remember the place where the piece was
        var oldPlace = whitePieces[selectedWhiteCapture].place;
        //Get the parent class name
        var parentClass = el.parentElement.className;
        parentClass = parentClass.replace("tile","");//Parsing class name
        var arr = parentClass.split("-");

        var x = document.getElementsByClassName("future");
        //Create a new image of the deleted old piece
        var img = document.createElement("img");
        img.setAttribute('onclick','selectWhitePiece(this)');
        img.src = "stylesheets/images/whitePiece.png";
        img.className = "white";
        img.id = selectedWhiteCapture;
        
        if(whiteCaptureAnything(selectedWhiteCapture,arr[0]) == true){
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
                else el.parentNode.appendChild(img);

            capturedWhite.pop();
        for(var i = 0; i < x.length;i++){
            x[i].parentNode.removeChild(x[i]);
            i--;
        }

        whitePieces[selectedWhiteCapture].move((whitePieces[selectedWhiteCapture].place - arr[0])*-1);
        //Switch turns or next move
                resetOptions();
                var status = checkWhiteStatus();
                if(dices.length == 2){
                    if(dices[0] + dices[1] == (oldPlace - arr[0])*-1){
                        rolledDice = false;
                        turn = 'black';
                    }
                    else if(dices[0] == (oldPlace - arr[0])*-1){
                        dices.splice(0,1);
                        if(status == 'normal')
                            if(normalMovesWhite(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'black';
                            }
                        if(status == 'captured')
                            if(capturedMovesWhite(dices) == false){
                                rolledDice = false;
                                turn = 'black';
                            }
                    }
                    else {
                        dices.splice(1,1);
                        if(status == 'normal')
                            if(normalMovesWhite(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'black';
                            }
                        if(status == 'captured')
                            if(capturedMovesWhite(dices) == false){
                                rolledDice = false;
                                turn = 'black';
                            }
                    }
                }
                else{
                    rolledDice = false;
                    turn = 'black';
                }
                
                //Remove black piece image
                if(capturedWhite.length == 0)
                    document.getElementsByClassName('capturedWhite')[0].parentNode.removeChild(document.getElementsByClassName('capturedWhite')[0]);

                document.getElementById('whiteCaptureCount').innerHTML = capturedWhite.length;
                document.getElementById("count" + whitePieces[selectedWhiteCapture].place).innerHTML = tile[whitePieces[selectedWhiteCapture].place].pieces;
                
                selectedWhiteCapture = -1;

        
}


function afterBlackCapturedMove(el){
     //Remember the place where the piece was
        var oldPlace = blackPieces[selectedBlackCapture - 15].place;
        //Get the parent class name
        var parentClass = el.parentElement.className;
        parentClass = parentClass.replace("tile","");//Parsing class name
        var arr = parentClass.split("-");

        var x = document.getElementsByClassName("future");
        //Create a new image of the deleted old piece
        var img = document.createElement("img");
        img.setAttribute('onclick','selectBlackPiece(this)');
        img.src = "stylesheets/images/blackPiece.png";
        img.className = "black";
        img.id = selectedBlackCapture-15;
        var x = document.getElementsByClassName("future");
        
        if(blackCaptureAnything(selectedBlackCapture,arr[0]) == true){
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

        capturedBlack.pop();
        for(var i = 0; i < x.length;i++){
            x[i].parentNode.removeChild(x[i]);
            i--;
        }

        blackPieces[selectedBlackCapture-15].move((blackPieces[selectedBlackCapture-15].place - arr[0])*-1);
        //Switch turns or next move
                resetOptions();
                var status = checkBlackStatus();
                if(dices.length == 2){
                    if(dices[0] + dices[1] == (oldPlace - arr[0])*-1){
                        rolledDice = false;
                        turn = 'white';
                    }
                    else if(dices[0] == (oldPlace - arr[0])*-1){
                        dices.splice(0,1);
                        if(status == 'normal')
                            if(normalMovesBlack(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'white';
                            }
                        if(status == 'captured')
                            if(capturedMovesBlack(dices) == false){
                                rolledDice = false;
                                turn = 'white';
                            }

                    }
                    else {
                        dices.splice(1,1);
                        if(status == 'normal')
                            if(normalMovesBlack(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'white';
                            }
                        if(status == 'captured')
                            if(capturedMovesBlack(dices) == false){
                                rolledDice = false;
                                turn = 'white';
                            }
                        
                    }
                }
                else{
                    rolledDice = false;
                    turn = 'white';
                }
                
                //Remove black piece image
                if(capturedBlack.length == 0)
                    document.getElementsByClassName('capturedBlack')[0].parentNode.removeChild(document.getElementsByClassName('capturedBlack')[0]);

                document.getElementById('blackCaptureCount').innerHTML = capturedBlack.length;
                document.getElementById("count" + blackPieces[selectedBlackCapture - 15].place).innerHTML = tile[blackPieces[selectedBlackCapture - 15].place].pieces;
                
                selectedBlackCapture = -1;

        
}
