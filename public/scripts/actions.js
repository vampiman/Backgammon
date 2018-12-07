//TO DO: Moree than 5 pieces functionality (DONE)
//MORE THAN 5 PIECES AFTER CAPTURE
//Tell the player that he can't move on wrong tile 
//CAN'T SELECT CAPTURED PIECES 2 TIMES
//WHITE CAPTURED MOVE + CHECK FOR CAPTURE AFTER MOVE (DONE)
//(COMPOSED MOVE) CAN CAPTURE ANOTHER PIECE (MEH)
//CAN ONLY DO ONE MOVE WHEN CAPTURED, NOT A COMPOSED MOVE
//DOUBLE MOVE

var whitePlaceHolders = [];
var blackPlaceHolder;


function afterWhiteMove(el){
            if(turn == 'white'){
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
                    if(tile[whitePieces[selectedWhite].options[i]].pieces >= 5){
                        //CHANGE PIECE BACK
                        var fifth = document.getElementsByClassName('tile' + whitePieces[selectedWhite].options[i] + '-5')[0].firstChild;
                        fifth.style.opacity = '1';
                        fifth.setAttribute('onclick', 'selectWhitePiece(this)');
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
        
        alert("Deselected piece");
        var futureMoves = document.getElementsByClassName('future');
        while(futureMoves.length != 0)
            futureMoves[0].parentNode.removeChild(futureMoves[0]);
        //CHECK IF ANY 5th piece has to be changed back
        for(var i = 0; i < whitePieces[selectedWhite].options.length;i++){
            if(tile[whitePieces[selectedWhite].options[i]].pieces >= 5){
                //CHANGE PIECE BACK
                var fifth = document.getElementsByClassName('tile' + whitePieces[selectedWhite].options[i] + '-5')[0].firstChild;
                fifth.style.opacity = '1';
                fifth.setAttribute('onclick', 'selectWhitePiece(this)');
            }
        }
        selectedWhite = -1;
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
            if(tile[whitePieces[selectedWhite].options[i]].pieces >= 5){
                //TEMPORARILY CHANGE PIECE
                var fifth = document.getElementsByClassName('tile' + whitePieces[selectedWhite].options[i] + '-5')[0].firstChild;
                fifth.style.opacity = '0.5';
                fifth.setAttribute('onclick', 'afterWhiteMove(this)');
            }
            else
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
        
        alert("Deselected piece");
        var futureMoves = document.getElementsByClassName('future');
        while(futureMoves.length != 0)
            futureMoves[0].parentNode.removeChild(futureMoves[0]);
        //CHECK IF ANY 5th piece has to be changed back
        for(var i = 0; i < blackPieces[selectedBlack - 15].options.length;i++){
            if(tile[blackPieces[selectedBlack - 15].options[i]].pieces >= 5){
                //CHANGE PIECE BACK
                var fifth = document.getElementsByClassName('tile' + blackPieces[selectedBlack - 15].options[i] + '-5')[0].firstChild;
                fifth.style.opacity = '1';
                fifth.setAttribute('onclick', 'selectBlackPiece(this)');
            }
        }
        selectedBlack = -1;
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
            if(tile[blackPieces[selectedBlack - 15].options[i]].pieces >= 5){
                //TEMPORARILY CHANGE PIECE
                var fifth = document.getElementsByClassName('tile' + blackPieces[selectedBlack - 15].options[i] + '-5')[0].firstChild;
                fifth.style.opacity = '0.5';
                fifth.setAttribute('onclick', 'afterBlackMove(this)');
            }
            else
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
                    if(tile[blackPieces[selectedBlack - 15].options[i]].pieces >= 5){
                        //CHANGE PIECE BACK
                        var fifth = document.getElementsByClassName('tile' + blackPieces[selectedBlack - 15].options[i] + '-5')[0].firstChild;
                        fifth.style.opacity = '1';
                        fifth.setAttribute('onclick', 'selectBlackPiece(this)');
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
if(selectedBlackCapture == -1){
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
                if(tile[blackPieces[selectedBlackCapture - 15].options[i]].pieces >= 5){
                //TEMPORARILY CHANGE PIECE
                    var fifth = document.getElementsByClassName('tile' + blackPieces[selectedBlackCapture - 15].options[i] + '-5')[0].firstChild;
                    fifth.style.opacity = '0.5';
                    fifth.setAttribute('onclick', 'afterBlackCapturedMove(this)');
                }
                else
                document.getElementsByClassName("tile" + blackPieces[selectedBlackCapture-15].options[i] + "-" + number)[0].appendChild(img);
                if(blackPieces[selectedBlackCapture-15].options[0] == blackPieces[selectedBlackCapture-15].options[1])
                    i++;
            }
        }
        else alert('Not your turn BOI');
    }
    else alert('Roll the dice first');
}
else{
     alert("Can not select!");
}
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



///////////////////TO TEST/////////////////////////////
function selectCapturedWhite(element){
if(selectedWhiteCapture == -1){
    if(rolledDice == true){
        if(turn == 'white'){
            selectedWhiteCapture = capturedWhite[capturedWhite.length-1];
            alert("Captured piece selected!");
            for(var i = 0; i < whitePieces[selectedWhiteCapture].options.length; i++){
                var number = tile[whitePieces[selectedWhiteCapture].options[i]].pieces + 1;
                var img = document.createElement("img");
                img.setAttribute('onclick','afterWhiteCapturedMove(this)');
                img.src = "stylesheets/images/whitePiece.png";
                img.className = "future";
                document.getElementsByClassName("tile" + whitePieces[selectedWhiteCapture].options[i] + "-" + number)[0].appendChild(img);
                if(whitePieces[selectedWhiteCapture].options[0] == whitePieces[selectedWhiteCapture].options[1])
                    i++;
            }
        }
        else alert('Not your turn BOI');
    }
    else alert('Roll the dice first');
    }
else alert('Can not select');
}

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