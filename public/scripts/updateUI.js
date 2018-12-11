//UPDATE UI AFTER WHITE MOVE
function updateWhiteMove(pieceID, target){
    document.getElementById("count" + whitePieces[pieceID].place).innerHTML = tile[whitePieces[pieceID].place].pieces - 1;
    whitePieces[pieceID].move((whitePieces[pieceID].place - target)*-1);

    var whites = document.getElementsByClassName('white');
    var number = tile[target].pieces;
    var notFound = true;
    var i = 0;
    while(notFound){
        if(whites[i].id == pieceID)
            notFound = false;
        else
            i = i + 1;
    }

    if(tile[target].pieces <= 5)
        document.getElementsByClassName('tile' + target + '-' + number)[0].appendChild(whites[i]);
    else
        whites[i].parentNode.removeChild(whites[i].parentNode.firstChild);
    
    document.getElementById("count" + target).innerHTML = number;
}
//UPDATE UI AFTER BLACK MOVE
function updateBlackMove(pieceID, target){
    document.getElementById("count" + blackPieces[pieceID].place).innerHTML = tile[blackPieces[pieceID].place].pieces - 1;
    blackPieces[pieceID].move((blackPieces[pieceID].place - target)*-1);

    var blacks = document.getElementsByClassName('black');
    var number = tile[target].pieces;
    var notFound = true;
    var i = 0;
    while(notFound){
        if(blacks[i].id == pieceID)
            notFound = false;
        else
            i = i + 1;
    }

    if(tile[target].pieces <= 5)
        document.getElementsByClassName('tile'+target + '-' + number)[0].appendChild(blacks[i]);
    else
        blacks[i].parentNode.removeChild(blacks[i].parentNode.firstChild);
    document.getElementById("count" + target).innerHTML = number;
}

//Update white move from captured position
function updateWhiteCapturedMove(target){

}

//Update black move from captured position
function updateBlackCapturedMove(target){
    
}

//Update white points
function updateWhiteWin(pieceID){

}

//Update black points
function updateBlackWin(pieceID){
    
}

//Update capture
function updateCapture(target){
    var color = tile[target].occupied;
    capture(target);
    

    var targetTile = document.getElementsByClassName('tile' + target +'-1');
    targetTile[0].removeChild(targetTile[0].firstChild);
    
    //Add captured on board and increment counter
    if(color == 'black'){
        if(capturedBlack.length < 2){
        var capturedSpot = document.getElementsByClassName('capturedBlackSpot');
                    
        var imgCapture = document.createElement("img");
        imgCapture.setAttribute('onclick','selectCapturedBlack(this)');
        imgCapture.src = "stylesheets/images/blackPiece.png";
        imgCapture.className = "capturedBlack";
        capturedSpot[0].appendChild(imgCapture);
                    
        }
    }
    if(color == 'white'){
        if(capturedWhite.length < 2){
        var capturedSpot = document.getElementsByClassName('capturedWhiteSpot');
                    
        var imgCapture = document.createElement("img");
        imgCapture.setAttribute('onclick','selectCapturedWhite(this)');
        imgCapture.src = "stylesheets/images/whitePiece.png";
        imgCapture.className = "capturedWhite";
        capturedSpot[0].appendChild(imgCapture);
                    
        }
    }

    var capturedCounter = document.getElementsByClassName('capturedBlackCounter');
    document.getElementById('blackCaptureCount').innerHTML = capturedBlack.length;
}