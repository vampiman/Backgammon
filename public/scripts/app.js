//Three possible statuses for tiles: white, black, free
//Three possible statuses for players: home, captured, normal
//42 is the winning option code



//Point to win
var whitePoints = 0;
var blackPoints = 0;

//Array of dices (can only be 2 dices at a time, in case of a double move, the player will simply get 2 more dices of the same number at the of the turn)
var dices = [];
var rolledDice = false;
var turn = 'white';

//Array of pieces
var blackPieces = [];
var whitePieces = [];

//Captured pieces
var capturedWhite = [];
var capturedBlack = [];

var tile = [];
//White pieces
var w0, w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14;
//Black pieces
var b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14;


//Initialize the board
for(var i = 0; i <= 25; i++)
    tile.push({occupied: 'free',
               pieces: 0,
               objects: []});


// Piece constructor
function Piece(id, color, place) {
    this.id = id;
    this.color = color;
    this.place = place;
    tile[place].pieces++;
    tile[place].occupied = color;
    tile[place].objects.push(id);
    this.options = [];

    this.move = function(offset){

        tile[this.place].pieces = tile[this.place].pieces - 1;

        if(tile[this.place].pieces == 0)
            tile[this.place].occupied = 'free';

        if(this.color == 'white' && (this.place + offset) <= 0){
                whitePoints++;
                tile[this.place].objects.pop();
                this.place = -1;
        }
        else if(this.color == 'black' && (this.place + offset) >= 25){
                blackPoints++;
                tile[this.place].objects.pop();
                this.place = -1;
        }
        else {
        tile[this.place + offset].objects.push(tile[this.place].objects.pop());
        tile[this.place + offset].pieces++;
        tile[this.place + offset].occupied = this.color;

        this.place = this.place + offset;
        }
    }

} ;

//////////////////////////NOT ENOUGH TESTING/////////////////////////////////////////
//NEED TO TEST THE EFFECT ON THE TILES
    Piece.prototype.win = function(){
        tile[this.place].pieces--;
        tile[this.place].objects.pop();
        if(this.color == 'white'){
            whitePoints++;
            whitePieces.splice(this.id, 1);
        }
        if(this.color == 'black'){
            blackPoints++;
            blackPieces.splice(this.id - 15, 1);
        }

    }


//Dice roll
function roll() {
    return Math.floor(6 * Math.random() + 1);
}

//Initialize white pieces on board
function initializeWhite() {
    w0 = new Piece(0, 'white', 6);
    w1 = new Piece(1, 'white', 6);
    w2 = new Piece(2, 'white', 6);
    w3 = new Piece(3, 'white', 6);
    w4 = new Piece(4, 'white', 6);
    w5 = new Piece(5, 'white', 8);
    w6 = new Piece(6, 'white', 8);
    w7 = new Piece(7, 'white', 8);
    w8 = new Piece(8, 'white', 13);
    w9 = new Piece(9, 'white', 13);
    w10 = new Piece(10, 'white', 13);
    w11 = new Piece(11, 'white', 13);
    w12 = new Piece(12, 'white', 13);
    w13 = new Piece(13, 'white', 24);
    w14 = new Piece(14, 'white', 24);

    whitePieces.push(w0);
    whitePieces.push(w1);
    whitePieces.push(w2);
    whitePieces.push(w3);
    whitePieces.push(w4);
    whitePieces.push(w5);
    whitePieces.push(w6);
    whitePieces.push(w7);
    whitePieces.push(w8);
    whitePieces.push(w9);
    whitePieces.push(w10);
    whitePieces.push(w11);
    whitePieces.push(w12);
    whitePieces.push(w13);
    whitePieces.push(w14);
}

//Initiallize black pieces on board
function initializeBlack() {
    b0 = new Piece(15, 'black', 19);
    b1 = new Piece(16, 'black', 19);
    b2 = new Piece(17, 'black', 19);
    b3 = new Piece(18, 'black', 19);
    b4 = new Piece(19, 'black', 19);
    b5 = new Piece(20, 'black', 17);
    b6 = new Piece(21, 'black', 17);
    b7 = new Piece(22, 'black', 17);
    b8 = new Piece(23, 'black', 12);
    b9 = new Piece(24, 'black', 12);
    b10 = new Piece(25, 'black', 12);
    b11 = new Piece(26, 'black', 12);
    b12 = new Piece(27, 'black', 12);
    b13 = new Piece(28, 'black', 1);
    b14 = new Piece(29, 'black', 1);

    blackPieces.push(b0);
    blackPieces.push(b1);
    blackPieces.push(b2);
    blackPieces.push(b3);
    blackPieces.push(b4);
    blackPieces.push(b5);
    blackPieces.push(b6);
    blackPieces.push(b7);
    blackPieces.push(b8);
    blackPieces.push(b9);
    blackPieces.push(b10);
    blackPieces.push(b11);
    blackPieces.push(b12);
    blackPieces.push(b13);
    blackPieces.push(b14);

}

//Modifies the options of all the white captured pieces and returns if moves are possible or not for the captured pieces
function capturedMovesWhite(dices){
    var possible = false;
    for(var i = 0; i < capturedWhite.length; i++) {
       if(dices.length == 2){
            if(tile[whitePieces[capturedWhite[i]].place + dices[0]].pieces <= 1 || tile[whitePieces[capturedWhite[i]].place + dices[0]].occupied == 'white')
                whitePieces[capturedWhite[i]].options.push(whitePieces[capturedWhite[i]].place + dices[0]);

            if(tile[whitePieces[capturedWhite[i]].place + dices[1]].pieces <= 1 || tile[whitePieces[capturedWhite[i]].place + dices[1]].occupied == 'white')
                whitePieces[capturedWhite[i]].options.push(whitePieces[capturedWhite[i]].place + dices[1]);

            if(whitePieces[capturedWhite[i]].options.length > 0)
            if(tile[whitePieces[capturedWhite[i]].place + dices[0] + dices[1]].pieces <= 1 || tile[whitePieces[capturedWhite[i]].place + dices[0] + dices[1]].occupied == 'white')
                whitePieces[capturedWhite[i]].options.push(whitePieces[capturedWhite[i]].place + dices[1] + dices[0]);

            if(whitePieces[capturedWhite[i]].options.length > 0)
                possible =  true;
        }
        if(dices.length == 1){
            if(tile[whitePieces[capturedWhite[i]].place + dices[0]].pieces <= 1 || tile[whitePieces[capturedWhite[i]].place + dices[0]].occupied == 'white')
                whitePieces[capturedWhite[i]].options.push(whitePieces[capturedWhite[i]].place + dices[0]);

            if(whitePieces[capturedWhite[i]].options.length > 0)
                possible =  true;
        }
    }

    return possible;
}

////////////////////////////////NOT TESTED YET///////////////////////////////////////////////////////

//Modifies the options of all the black captured pieces and returns if there are any possible moves
function capturedMovesBlack(dices){
    var possible = false;
    for(var i = 0; i < capturedBlack.length; i++) {
       if(dices.length == 2){
            if(tile[blackPieces[capturedBlack[i] - 15].place + dices[0]].pieces <= 1 || tile[blackPieces[capturedBlack[i] - 15].place + dices[0]].occupied == 'black')
                blackPieces[capturedBlack[i] - 15].options.push(blackPieces[capturedBlack[i] - 15].place + dices[0]);

            if(tile[blackPieces[capturedBlack[i] - 15].place + dices[1]].pieces <= 1 || tile[blackPieces[capturedBlack[i] - 15].place + dices[1]].occupied == 'black')
                blackPieces[capturedBlack[i] - 15].options.push(blackPieces[capturedBlack[i] - 15].place + dices[1]);

            if(blackPieces[capturedBlack[i] - 15].options.length > 0)
            if(tile[blackPieces[capturedBlack[i] - 15].place + dices[0] + dices[1]].pieces <= 1 || tile[blackPieces[capturedBlack[i] - 15].place + dices[0] + dices[1]].occupied == 'black')
                blackPieces[capturedBlack[i] - 15].options.push(blackPieces[capturedBlack[i] - 15].place + dices[1] + dices[0]);

            if(blackPieces[capturedBlack[i] - 15].options.length > 0)
                possible =  true;
        }
        if(dices.length == 1){
            if(tile[blackPieces[capturedBlack[i] - 15].place + dices[0]].pieces <= 1 || tile[blackPieces[capturedBlack[i] - 15].place + dices[0]].occupied == 'black')
                blackPieces[capturedBlack[i] - 15].options.push(blackPieces[capturedBlack[i] - 15].place + dices[0]);

            if(blackPieces[capturedBlack[i] - 15].options.length > 0)
                possible =  true;
        }
    }

    return possible;
}

//////////////////////////////////////////////NOT TESTED YET//////////////////////////////////////////////

//Modifies the options of all the white pieces that are in home and close to winning and returns if there are any possible moves for white pieces
function homeMovesWhite(dices){
    var possible = false;
    for(var i = 0; i < whitePieces.length; i++) {
        if(dices.length == 2){
            if(whitePieces[i].place + dices[0] > 0){
                if(tile[whitePieces[i].place + dices[0]].pieces <= 1 || tile[whitePieces[i].place + dices[0]].occupied == 'white')
                    whitePieces[i].options.push(whitePieces[i].place + dices[0]);
            }
            else{
                whitePieces[i].options.push(42);
            }

            if(whitePieces[i].place + dices[1] > 0){
                if(tile[whitePieces[i].place + dices[1]].pieces <= 1 || tile[whitePieces[i].place + dices[1]].occupied == 'white')
                    whitePieces[i].options.push(whitePieces[i].place + dices[1]);
            }
            else{
                whitePieces[i].options.push(42);
            }

            if(whitePieces[i].options.length > 0 && whitePieces[i].options.includes(42) == false){
                if(whitePieces[i].place + dices[1] + dices[0] > 0){
                    if(tile[whitePieces[i].place + dices[0] + dices[1]].pieces <= 1 || tile[whitePieces[i].place + dices[0] + dices[1]].occupied == 'white')
                        whitePieces[i].options.push(whitePieces[i].place + dices[1] + dices[0]);
                }
                else{
                    whitePieces[i].options.push(42);
                }
            }

            if(whitePieces[i].options.length > 0)
                possible =  true;

        }
        if(dices.length == 1) {
            if(whitePieces[i].place + dices[0] > 0) {
                if(tile[whitePieces[i].place + dices[0]].pieces <= 1 || tile[whitePieces[i].place + dices[0]].occupied == 'white')
                    whitePieces[i].options.push(whitePieces[i].place + dices[0]);
            }
            else {
                whitePieces[i].options.push(42);
            }

            if(whitePieces[i].options.length > 0)
                possible =  true;
        }
    }
}

/////////////////////////////////////////////NOT TESTED YED/////////////////////////////////////////////////

//Modifies the options of all the black pieces that are in home and close to winning and returns if there are any possible moves for black pieces
function homeMovesBlack(dices){
    var possible = false;
    for(var i = 0; i < blackPieces.length; i++) {
        if(dices.length == 2){
            if(blackPieces[i].place + dices[0] < 25){
                if(tile[blackPieces[i].place + dices[0]].pieces <= 1 || tile[blackPieces[i].place + dices[0]].occupied == 'black')
                    blackPieces[i].options.push(blackPieces[i].place + dices[0]);
            }
            else{
                blackPieces[i].options.push(42);
            }

            if(blackPieces[i].place + dices[1] < 25){
                if(tile[blackPieces[i].place + dices[1]].pieces <= 1 || tile[blackPieces[i].place + dices[1]].occupied == 'black')
                    blackPieces[i].options.push(blackPieces[i].place + dices[1]);
            }
            else{
                blackPieces[i].options.push(42);
            }

            if(blackPieces[i].options.length > 0 && blackPieces[i].options.includes(42) == false){
                if(blackPieces[i].place + dices[1] + dices[0] < 25){
                    if(tile[blackPieces[i].place + dices[0] + dices[1]].pieces <= 1 || tile[blackPieces[i].place + dices[0] + dices[1]].occupied == 'black')
                        blackPieces[i].options.push(blackPieces[i].place + dices[1] + dices[0]);
                }
                else{
                    blackPieces[i].options.push(42);
                }
            }

            if(blackPieces[i].options.length > 0)
                possible =  true;

        }
        if(dices.length == 1) {
            if(blackPieces[i].place + dices[0] < 25) {
                if(tile[blackPieces[i].place + dices[0]].pieces <= 1 || tile[blackPieces[i].place + dices[0]].occupied == 'black')
                    blackPieces[i].options.push(blackPieces[i].place + dices[0]);
            }
            else {
                blackPieces[i].options.push(42);
            }

            if(blackPieces[i].options.length > 0)
                possible =  true;
        }
    }
}

//Modifies the options of all the white pieces on board and returns if moves are possible or not for white pieces
function normalMovesWhite(dices) {
    var possible = false;
    for(var i = 0; i < whitePieces.length; i++){
        if(dices.length == 2){
            if(whitePieces[i].place + dices[0] > 0 && (tile[whitePieces[i].place + dices[0]].pieces <= 1 || tile[whitePieces[i].place + dices[0]].occupied == 'white'))
                whitePieces[i].options.push(whitePieces[i].place + dices[0]);

            if(whitePieces[i].place + dices[1] > 0 && (tile[whitePieces[i].place + dices[1]].pieces <= 1 || tile[whitePieces[i].place + dices[1]].occupied == 'white'))
                whitePieces[i].options.push(whitePieces[i].place + dices[1]);

            //CHANGED CONDITION
            if(whitePieces[i].options.length > 0)
            if(whitePieces[i].place + dices[1] + dices[0] > 0 && (tile[whitePieces[i].place + dices[0] + dices[1]].pieces <= 1 || tile[whitePieces[i].place + dices[0] + dices[1]].occupied == 'white'))
                whitePieces[i].options.push(whitePieces[i].place + dices[1] + dices[0]);

            if(whitePieces[i].options.length > 0)
                possible =  true;
        }
        if(dices.length == 1){
            if(whitePieces[i].place + dices[0] > 0 && (tile[whitePieces[i].place + dices[0]].pieces <= 1 || tile[whitePieces[i].place + dices[0]].occupied == 'white'))
                whitePieces[i].options.push(whitePieces[i].place + dices[0]);

            if(whitePieces[i].options.length > 0)
                possible =  true;
        }
    }

    return possible;
}

//Modifies the options of all black pieces on board and returns if there are any moves possible
function normalMovesBlack(dices) {
    var possible = false;
    for(var i = 0; i < blackPieces.length; i++){
        if(dices.length == 2){
            if(blackPieces[i].place + dices[0] < 25 && (tile[blackPieces[i].place + dices[0]].pieces <= 1 || tile[blackPieces[i].place + dices[0]].occupied == 'black'))
                blackPieces[i].options.push(blackPieces[i].place + dices[0]);

            if(blackPieces[i].place + dices[1] < 25 && (tile[blackPieces[i].place + dices[1]].pieces <= 1 || tile[blackPieces[i].place + dices[1]].occupied == 'black'))
                blackPieces[i].options.push(blackPieces[i].place + dices[1]);

            if(blackPieces[i].options.length > 0)
            if(blackPieces[i].place + dices[1] + dices[0] < 25 && (tile[blackPieces[i].place + dices[0] + dices[1]].pieces <= 1 || tile[blackPieces[i].place + dices[0] + dices[1]].occupied == 'black'))
                blackPieces[i].options.push(blackPieces[i].place + dices[1] + dices[0]);

            if(blackPieces[i].options.length > 0)
                possible =  true;
        }
        if(dices.length == 1){
            if(blackPieces[i].place + dices[0] < 25 && (tile[blackPieces[i].place + dices[0]].pieces <= 1 || tile[blackPieces[i].place + dices[0]].occupied == 'black'))
                blackPieces[i].options.push(blackPieces[i].place + dices[0]);

            if(blackPieces[i].options.length > 0)
                possible =  true;
        }
    }

    return possible;
}

//Resets all options for all pieces
function resetOptions(){
    for(var i = 0; i < whitePieces.length; i++)
        while(whitePieces[i].options.length > 0)
            whitePieces[i].options.splice(0, 1);

    for(var i = 0; i < blackPieces.length; i++)
        while(blackPieces[i].options.length > 0)
            blackPieces[i].options.splice(0, 1);
}

//Check the status of the white pieces in order to know which moves to search for
function checkWhiteStatus() {
    var home = true;
    if(capturedWhite.length > 0)
        return 'captured';

    for(var i = 0; i < whitePieces.length; i++)
        if(whitePieces[i].place > 6)
            home = false;

    if(home == true)
        return 'home';

    return 'normal';
}

//Check the status of the black pieces in order to know which moves to search for
function checkBlackStatus() {
    var home = true;
    if(capturedBlack.length > 0)
        return 'captured';

    for(var i = 0; i < blackPieces.length; i++)
        if(blackPieces[i].place < 19)
            home = false;

    if(home == true)
        return 'home';

    return 'normal';
}

//Check the availability of the selected move for a white piece
function checkWhiteMove(pieceId, target){
    if(whitePieces[pieceId].options.includes(target) == true)
        return true;
    else
        return false;
}

//Check the availability of the selected move for a black piece
function checkBlackMove(pieceId, target){
    if(blackPieces[pieceId].options.includes(target) == true)
        return true;
    else
        return false;
}

//Check if there is any piece to capture there
function whiteCaptureAnything(pieceId, target){
    if(tile[target].pieces == 1  && tile[target].occupied == 'black')
        return true;

    return false;
}

//Check if there is any piece to capture there
function blackCaptureAnything(pieceId, target){
    if(tile[target].pieces == 1  && tile[target].occupied == 'white')
        return true;

    return false;
}

//Remove a piece from the board into the capture space
function capture(target){
    if(tile[target].occupied == 'white'){
        whitePieces[tile[target].objects[0]].place = 25;
        tile[25].objects.push(tile[target].objects[0]);
        tile[25].pieces++;
        capturedWhite.push(tile[target].objects.pop());
    }
    else{
        blackPieces[tile[target].objects[0] - 15].place = 0;
        tile[0].objects.push(tile[target].objects[0]);
        tile[0].pieces++;
        capturedBlack.push(tile[target].objects.pop());
    }
    tile[target].pieces = 0;
    tile[target].occupied = 'free';
}

function whiteToWin(pieceID){
    tile[whitePieces[pieceID].place].pieces--;
    if(tile[whitePieces[pieceID].place].pieces == 0)
        tile[whitePieces[pieceID].place].occupied = 'free';
    tile[whitePieces[pieceID].place].objects.pop();
    whitePieces[pieceID].place = 1;
    whitePoints++;
}

function blackToWin(pieceID){
    tile[blackPieces[pieceID - 15].place].pieces--;
    if(tile[blackPieces[pieceID - 15].place].pieces == 0)
        tile[blackPieces[pieceID - 15].place].occupied = 'free';
    tile[blackPieces[pieceID - 15].place].objects.pop();
    blackPieces[pieceID - 15].place = 24;
    blackPoints++;
}


initializeWhite();
initializeBlack();


/*TESTING HOME MOVES BLACK
homeMovesBlack([6,6]);
console.log(blackPieces[4]);
blackPieces[4].win();
resetOptions();
console.log(blackPieces);
console.log(blackPoints);
*/

/*TESTING CAPTURED BLACK MOVES
capture(1);
console.log(tile[1]);
console.log(tile[0]);
console.log(blackPieces[14]);
console.log(capturedMovesBlack([6,2]));
console.log(blackPieces[14]);
*/

/*TESTING HOME MOVES FOR WHITE
homeMovesWhite([-6,-5]);
console.log(whitePieces[8]);
*/

/* TESTING CAPTURE
capture(1);
whitePieces[4].move(-5);
console.log(tile[1]);
console.log(whitePieces[4]);
console.log(tile[0]);
var dices = [6,5];
capturedMovesBlack(dices);
console.log(blackPieces[14]);
blackPieces[4].win();
console.log(blackPieces);
console.log(blackPoints);
*/

/* TESTING SOME MOVE SETS
console.log(normalMovesBlack([4,6]));
console.log(checkBlackMove(4,23));
console.log(blackCaptureAnything(4,23));
capture(23);
console.log(whitePieces[14]);
console.log(capturedWhite);
blackPieces[4].move(4);
resetOptions();
console.log(blackPieces[4]);
console.log(tile[23] + '\n');
console.log(checkWhiteStatus());
console.log(capturedWhite + '\n');
capturedMovesWhite([-6,-5]);
console.log(whitePieces[14].options);
capturedWhite.pop();
//tile[25].objects.push(14);
whitePieces[14].move(-5);
console.log(whitePieces[14]);
resetOptions();
console.log(tile[20]);
console.log(whitePieces[14]);
*/




//CONSOLE TESTING
/*
tile[19].objects[tile[19].objects.length-1].move(6);

tile[19].objects[tile[19].objects.length-1].move(6);

console.log(tile[19]);
console.log(tile[20]);
console.log(tile[21]);
console.log(blackPoints);
*/

/*
var turn = 'white';




*/
//Select a piece
var selectedWhite = -1;
var selectedBlack = -1;
var selectedBlackCapture = -1;
var selectedWhiteCapture = -1;
var placeHolder = [];
var double = false;

$(() => {

// Rolled the dice
$(".roll").click(function(){
    //Create message to send to the server
    var rollMsg = Messages.O_ROLLED_DICE;

    
    if(rolledDice == false){
        dices[0] = roll();
        dices[1] = roll();

        

        if(dices[0] == dices[1])
            double = true;
        else
            double = false;
        //Send the dices to the server as data
        rollMsg.data = dices;

        rolledDice = true;
        if(turn == 'white'){
            dices[0] = dices[0]*-1;
            dices[1] = dices[1]*-1;

            placeHolder[0] = dices[0];
            placeHolder[1] = dices[1];

            if(checkWhiteStatus() == 'normal')
                if(normalMovesWhite(dices) == false){
                    rolledDice = false;
                    turn = 'black';
                    resetOptions();
                    rollMsg.data = null;

                }
            if(checkWhiteStatus() == 'captured')
                if(capturedMovesWhite(dices) == false) {
                    rolledDice = false;
                    turn = 'black';
                    resetOptions();
                    rollMsg.data = null;
                }
            if(checkWhiteStatus() == 'home')
                if(homeMovesWhite(dices) == false) {
                    rolledDice = false;
                    turn = 'black';
                    resetOptions();
                    rollMsg.data = null;
                }
            
        }
        else if(turn == 'black'){

            placeHolder[0] = dices[0];
            placeHolder[1] = dices[1];
            
            if(checkBlackStatus() == 'normal')
                if(normalMovesBlack(dices) == false){
                    rolledDice = false;
                    turn = 'white';
                    resetOptions();
                    rollMsg.data = null;
                }
            if(checkBlackStatus() == 'captured')
                if(capturedMovesBlack(dices) == false){
                    rolledDice = false;
                    turn = 'white';
                    resetOptions();
                    rollMsg.data = null;
                }
            if(checkBlackStatus() == 'home')
                if(homeMovesBlack(dices) == false){
                    rolledDice = false;
                    turn = 'white';
                    resetOptions();
                    rollMsg.data = null;
                }
        }
        $('#rolled').html(dices[0] + ' ' + dices[1]);
        $('.roll').css('visibility','hidden');


        
        socket.send(JSON.stringify(rollMsg));
    }
   else
        alert("You can't roll the dice again, make a move!")
});
});

