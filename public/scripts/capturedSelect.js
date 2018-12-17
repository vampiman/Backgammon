///////////////////TO TEST/////////////////////////////
function selectCapturedWhite(element){
if(selectedWhiteCapture == -1){
    if(rolledDice == true){
        if(turn == 'white'){
            selectedWhiteCapture = capturedWhite[capturedWhite.length-1];
            //Make a sound
            var sound = new Audio('stylesheets/images/select.wav');
            sound.play();
            alert("Captured piece selected!");
            for(var i = 0; i < whitePieces[selectedWhiteCapture].options.length; i++){
                var number = tile[whitePieces[selectedWhiteCapture].options[i]].pieces + 1;
                var img = document.createElement("img");
                img.setAttribute('onclick','afterWhiteCapturedMove(this)');
                img.src = "stylesheets/images/whitePiece.png";
                img.className = "future";
                if(tile[whitePieces[selectedWhiteCapture].options[i]].pieces >= 5){
                //TEMPORARILY CHANGE PIECE
                var fifth = document.getElementsByClassName('tile' + whitePieces[selectedWhiteCapture].options[i] + '-5')[0].firstChild;
                fifth.style.opacity = '0.5';
                fifth.setAttribute('onclick', 'afterWhiteCapturedMove(this)');
                }
                else
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

///////////NOT TESTED YET///////////////
function selectCapturedBlack(element){
if(selectedBlackCapture == -1){
    if(rolledDice == true){
        if(turn == 'black'){
            selectedBlackCapture = capturedBlack[capturedBlack.length-1];
            //Make a sound
            var sound = new Audio('stylesheets/images/select.wav');
            sound.play();
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