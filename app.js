//Three possible statuses: whiteProtected, blackProtected, white, black, free
var tile = [];
var whitePieces = [];
var blackPieces = [];
//White pieces
var w0, w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14;
//Black pieces
var b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14;



for(var i = 0; i <= 24; i++)
    tile.push({occupied: 'free',
               pieces: 0,
               objects: []});



function Piece(id, color, place) {
    this.id = id;
    this.color = color;
    this.place = place;
    tile[place].pieces++;
    tile[place].occupied = color + 'Protected';
    tile[place].objects.push(this);

    this.move = function(dice1, dice2){
        tile[place].pieces--;

        if(tile[place].pieces == 0)
            tile[place].occupied = 'free';
        
        tile[place-number].pieces++;
        
        if(tile[place-number].pieces == 0)
            tile[place-number].occupied = color;
        
        this.place = place - number;
    }
} ;


function roll() {
    return Math.floor(6 * Math.random() + 1);
}

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

    /*
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
    */

}

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

initializeWhite();
initializeBlack();

console.log(tile[19])

/*
var rolledDice = false;
var selectedPiece = -1;
var turn = 'white';

//Select a piece
$(".tile").click(function(){
    if(rolledDice == true){
        if(selectedPiece == -1)
            selectedPiece = $(this).attr("id");
    }
    //$(".rolled").html("<br>" + $(this).attr("id"));
});

//Move a piece
$(".tile").dblclick(function(){
    if(selectedPiece != -1){
        alert("You just made a move");
        selectedPiece = -1;
    }
    else
        alert("Select a piece first");
});

// Rolled the dice
$(".roll").click(function(){
    if(rolledDice == false){
        $(".rolled").html("<br>" + roll() + " " + roll());
        rolledDice = true;
    }
   else
        alert("You can't roll the dice again, make a move!")
});


*/
