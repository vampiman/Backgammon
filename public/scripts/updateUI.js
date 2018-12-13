//UPDATE UI AFTER WHITE MOVE
function updateWhiteMove(pieceID, target){
    document.getElementById("count" + whitePieces[pieceID].place).innerHTML = tile[whitePieces[pieceID].place].pieces - 1;
    whitePieces[pieceID].move((whitePieces[pieceID].place - target)*-1);

    var whites = document.getElementsByClassName('white');
    var number = tile[target].pieces;
    var notFound = true;
    var i = 0;
    while(notFound == true && i < whites.length){
        if(whites[i].id == pieceID)
            notFound = false;
        else
            i = i + 1;
    }

    var img = null;
    if(notFound == true){
            img = document.createElement("img");
            img.setAttribute('onclick','selectWhitePiece(this)');
            img.src = "stylesheets/images/whitePiece.png";
            img.className = "white";
            img.id = pieceID;
    }
    else img = whites[i];

    if(tile[target].pieces <= 5){
        

        document.getElementsByClassName('tile' + target + '-' + number)[0].appendChild(img);
    }
    else if(notFound == false)
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
    while(notFound && i < blacks.length){
        if(blacks[i].id == pieceID)
            notFound = false;
        else
            i = i + 1;
    }

    var img = null;
        if(notFound == true){
            img = document.createElement("img");
            img.setAttribute('onclick','selectBlackPiece(this)');
            img.src = "stylesheets/images/blackPiece.png";
            img.className = "black";
            img.id = pieceID;
        }
        else img = blacks[i];

    if(tile[target].pieces <= 5){
        
        document.getElementsByClassName('tile' + target + '-' + number)[0].appendChild(img);
    }
    else if(notFound == false)
        img.parentNode.removeChild(img.parentNode.firstChild);
    
    document.getElementById("count" + target).innerHTML = number;
}

//Update white move from captured position
function updateWhiteCapturedMove(pieceID, target){
    whitePieces[pieceID].move((whitePieces[pieceID].place - target)*-1);
    capturedWhite.pop();

    var capturedImage = document.getElementsByClassName('capturedWhite')[0];

    var img = document.createElement("img");
        img.setAttribute('onclick','selectWhitePiece(this)');
        img.src = "stylesheets/images/whitePiece.png";
        img.className = "white";
        img.id = pieceID;

    if(tile[target].pieces <= 5){
        if(capturedWhite.length == 0)
            capturedImage.parentNode.removeChild(capturedImage.parentNode.firstChild);
        document.getElementsByClassName('tile' + target + '-' + tile[target].pieces)[0].appendChild(img);
    }
    else if(capturedWhite.length == 0)
        capturedImage.parentNode.removeChild(capturedImage.parentNode.firstChild);

    document.getElementById("count" + target).innerHTML = tile[target].pieces;
    
    document.getElementById('whiteCaptureCount').innerHTML = capturedWhite.length;
}

//Update black move from captured position
function updateBlackCapturedMove(pieceID, target){
    blackPieces[pieceID].move((blackPieces[pieceID].place - target)*-1);
    capturedBlack.pop();

    var capturedImage = document.getElementsByClassName('capturedBlack')[0];

    var img = document.createElement("img");
        img.setAttribute('onclick','selectBlackPiece(this)');
        img.src = "stylesheets/images/blackPiece.png";
        img.className = "black";
        img.id = pieceID;

    if(tile[target].pieces <= 5){
        if(capturedBlack.length == 0)
            capturedImage.parentNode.removeChild(capturedImage.parentNode.firstChild);
        document.getElementsByClassName('tile' + target + '-' + tile[target].pieces)[0].appendChild(img);
    }
    else if(capturedBlack.length == 0)
        capturedImage.parentNode.removeChild(capturedImage.parentNode.firstChild);

    document.getElementById("count" + target).innerHTML = tile[target].pieces;
    
    document.getElementById('blackCaptureCount').innerHTML = capturedBlack.length;
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

    document.getElementById('whiteCaptureCount').innerHTML = capturedWhite.length;
    document.getElementById('blackCaptureCount').innerHTML = capturedBlack.length;
}

//Remove white piece
function removeWhitePiece(pieceID){
    var whites = document.getElementsByClassName('white');
    
    var toRemove = null;

    var notFound = true;
    var i = 0;
    while(notFound == true && i < whites.length){
        if(whites[i].id == pieceID){
            notFound = false;
            toRemove = whites[i];
        }
        else
            i = i + 1;
    }

    

    document.getElementById("count" + whitePieces[pieceID].place).innerHTML = tile[whitePieces[pieceID].place].pieces - 1;

    whiteToWin(pieceID);

    if(notFound == false)
        toRemove.parentNode.removeChild(toRemove);


}

//Remove black piece
function removeBlackPiece(pieceID){
    var blacks = document.getElementsByClassName('black');
    
    var toRemove = null;

    var notFound = true;
    var i = 0;
    while(notFound == true && i < blacks.length){
        if(blacks[i].id == pieceID){
            notFound = false;
            toRemove = blacks[i];
        }
        else
            i = i + 1;
    }

    

    document.getElementById("count" + blackPieces[pieceID].place).innerHTML = tile[blackPieces[pieceID].place].pieces - 1;

    blackToWin(pieceID + 15);

    if(notFound == false)
        toRemove.parentNode.removeChild(toRemove);


}