//TO DO: Moree than 5 pieces functionality, Tell the player that he can't move on wrong tile 
function afterWhiteMove(el){
            if(turn == 'white'){
                //Remember the place where the piece was
                var oldPlace = whitePieces[selectedWhite].place;
                //Get the parent class name
                var parentClass = el.parentElement.className;
                parentClass = parentClass.replace("tile","");//Parsing class name
                var arr = parentClass.split("-");
                var old = document.getElementsByClassName("tile" + whitePieces[selectedWhite].place + "-" + tile[whitePieces[selectedWhite].place].pieces);
                old[0].removeChild(old[0].childNodes[0]); //Remove the old piece
                var x = document.getElementsByClassName("future");
                //Create a new image of the deleted old piece
                var img = document.createElement("img");
                img.setAttribute('onclick','selectWhitePiece(this)');
                img.src = "stylesheets/images/whitePiece.png";
                img.className = "white";
                img.id = selectedWhite;
                //Append it to the selected future move and check capture
                if(whiteCaptureAnything(selectedWhite,arr[0]) == true){
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
                for(var i = 0; i < x.length;i++){
                    x[i].parentNode.removeChild(x[i]);
                    i--;
                }
                //Fix the counters
                var counter = document.getElementById("count" + whitePieces[selectedWhite].place);
                var number = tile[whitePieces[selectedWhite].place].pieces - 1;
                document.getElementById("count" + whitePieces[selectedWhite].place).innerHTML = number; 
                whitePieces[selectedWhite].move((whitePieces[selectedWhite].place - arr[0])*-1);
                
                document.getElementById("count" + whitePieces[selectedWhite].place).innerHTML = tile[whitePieces[selectedWhite].place].pieces;
                
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

                    }
                    else {
                        dices.splice(1,1);
                        if(status == 'normal')
                            if(normalMovesWhite(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'black';
                            }
                        
                    }
                }
                else{
                    rolledDice = false;
                    turn = 'black'
                }
                
                selectedWhite = -1;
                
                
            }
            else
                alert('Not your turn boi!');
}

function selectWhitePiece(piece) {
if(turn == 'white'){
    if(rolledDice == true){
    var place = whitePieces[piece.id].place;
    
    //Deselect
    if(selectedWhite != -1 && whitePieces[selectedWhite].place == place) {
        selectedWhite = -1;
        alert("Deselected piece");
        var futureMoves = document.getElementsByClassName('future');
        while(futureMoves.length != 0)
            futureMoves[0].parentNode.removeChild(futureMoves[0]);
    }
    else if(tile[place].occupied == turn && selectedWhite == -1){
        selectedWhite = tile[place].objects[tile[place].objects.length - 1];
        alert("Tile selected");
        for(var i = 0; i < whitePieces[selectedWhite].options.length;i++){
            var number = tile[whitePieces[selectedWhite].options[i]].pieces + 1;
            var img = document.createElement("img");
            img.setAttribute('onclick','afterWhiteMove(this)');
            img.src = "stylesheets/images/whitePiece.png";
            img.className = "future";
            document.getElementsByClassName("tile" + whitePieces[selectedWhite].options[i] + "-" + number)[0].appendChild(img);
            if(whitePieces[selectedWhite].options[0] == whitePieces[selectedWhite].options[1])
                i++;
        }
    }
    }
    else alert('You have to roll the dice first');
 
}
else alert('Not your turn BOI');
}

//////////PARTIALLY TESTED////////////////
function selectBlackPiece(piece) {
if(turn == 'black'){
    if(rolledDice == true){
    var place = blackPieces[piece.id].place;
    
    //Deselect
    if(selectedBlack != -1 && blackPieces[selectedBlack-15].place == place) {
        selectedBlack = -1;
        alert("Deselected piece");
        var futureMoves = document.getElementsByClassName('future');
        while(futureMoves.length != 0)
            futureMoves[0].parentNode.removeChild(futureMoves[0]);
    }
    else if(tile[place].occupied == turn && selectedBlack == -1){
        selectedBlack = tile[place].objects[tile[place].objects.length - 1];
        alert("Tile selected");
        for(var i = 0; i < blackPieces[selectedBlack-15].options.length;i++){
            var number = tile[blackPieces[selectedBlack-15].options[i]].pieces + 1;
            var img = document.createElement("img");
            img.setAttribute('onclick','afterBlackMove(this)');
            img.src = "stylesheets/images/blackPiece.png";
            img.className = "future";
            document.getElementsByClassName("tile" + blackPieces[selectedBlack-15].options[i] + "-" + number)[0].appendChild(img);
            if(blackPieces[selectedBlack-15].options[0] == blackPieces[selectedBlack-15].options[1])
                i++;
        }
    }
    }
    else alert('You have to roll the dice first');
 
}
else alert('Not your turn BOI');
}

/////////////NOT TESTED YET///////////////////
function afterBlackMove(el){
            if(turn == 'black'){
                //Remember the place where the piece was
                oldPlace = blackPieces[selectedBlack - 15].place;
                //Get the parent class name
                var parentClass = el.parentElement.className;
                parentClass = parentClass.replace("tile","");//Parsing class name
                var arr = parentClass.split("-");
                var old = document.getElementsByClassName("tile" + blackPieces[selectedBlack - 15].place + "-" + tile[blackPieces[selectedBlack - 15].place].pieces);
                old[0].removeChild(old[0].childNodes[0]); //Remove the old piece
                var x = document.getElementsByClassName("future");
                //Create a new image of the deleted old piece
                var img = document.createElement("img");
                img.setAttribute('onclick','selectBlackPiece(this)');
                img.src = "stylesheets/images/blackPiece.png";
                img.className = "black";
                img.id = selectedBlack - 15;
                //Append it to the selected future move
                el.parentNode.appendChild(img);
                for(var i = 0; i < x.length;i++){
                    x[i].parentNode.removeChild(x[i]);
                    i--;
                }
                //Fix the counters
                var counter = document.getElementById("count" + blackPieces[selectedBlack - 15].place);
                var number = tile[blackPieces[selectedBlack - 15].place].pieces - 1;
                document.getElementById("count" + blackPieces[selectedBlack - 15].place).innerHTML = number; 
                blackPieces[selectedBlack - 15].move(arr[0] - blackPieces[selectedBlack - 15].place);
                
                document.getElementById("count" + blackPieces[selectedBlack - 15].place).innerHTML = tile[blackPieces[selectedBlack - 15].place].pieces;
                
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

                    }
                    else {
                        dices.splice(1,1);
                        if(status == 'normal')
                            if(normalMovesBlack(dices) == false){
                                alert('No possible moves');
                                rolledDice =  false;
                                turn = 'white';
                            }
                        
                    }
                }
                else{
                    rolledDice = false;
                    turn = 'white'
                }
                
                selectedBlack = -1;
                
                
            }
            else
                alert('Not your turn boi!');
}

///////////NOT TESTED YET///////////////
function selectCapturedBlack(element){
if(rolledDice == true){
    if(turn == 'black'){
        selectedBlackCapture = capturedBlack[capturedBlack.length-1];
        alert("Captured piece selected!");
        for(var i = 0; i < blackPieces[selectedBlackCapture - 15].options.length; i++){
            var number = tile[blackPieces[selectedBlackCapture-15].options[i]].pieces + 1;
            var img = document.createElement("img");
            img.setAttribute('onclick','afterBlackCapturedMove(this)');
            img.src = "stylesheets/images/blackPiece.png";
            img.className = "future";
            document.getElementsByClassName("tile" + blackPieces[selectedBlackCapture-15].options[i] + "-" + number)[0].appendChild(img);
            if(blackPieces[selectedBlackCapture-15].options[0] == blackPieces[selectedBlackCapture-15].options[1])
                i++;
        }
    }
    else alert('Not your turn BOI');
}else alert('Roll the dice first');
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
        blackPieces[selectedBlackCapture-15].move((blackPieces[selectedBlackCapture-15].place - arr[0])*-1);
        capturedBlack.pop();

        //TO IMPLEMENT CAPTURE
        el.parentNode.appendChild(img);
        for(var i = 0; i < x.length;i++){
            x[i].parentNode.removeChild(x[i]);
            i--;
        }

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
                
                selectedBlackCapture = -1;

        
}