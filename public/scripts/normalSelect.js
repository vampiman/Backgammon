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
            if(whitePieces[selectedWhite].options[i] != 42){
            if(tile[whitePieces[selectedWhite].options[i]].pieces >= 5){
                //CHANGE PIECE BACK
                var fifth = document.getElementsByClassName('tile' + whitePieces[selectedWhite].options[i] + '-5')[0].firstChild;
                fifth.style.opacity = '1';
                fifth.setAttribute('onclick', 'selectWhitePiece(this)');
            }
            }
        }
        selectedWhite = -1;
        document.getElementById('whitePoint').style.display = 'none';
    }
    else if(tile[place].occupied == turn && selectedWhite == -1){
        selectedWhite = tile[place].objects[tile[place].objects.length - 1];
        alert("Tile selected");
        for(var i = 0; i < whitePieces[selectedWhite].options.length;i++){
            if(whitePieces[selectedWhite].options[i] == 42){
                document.getElementById('whitePoint').style.display = 'block';
            }
            else {
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