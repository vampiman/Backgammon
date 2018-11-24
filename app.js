
var tile = [];

for(var i = 0; i <= 24; i++)
    tile.push({occupied: 'free',
               pieces: 0});

var p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14;

function Piece(id, color, place) {
    this.id = id;
    this.color = color;
    this.place = place;
    tile[place].pieces++;
    tile[place].occupied = color;

    this.move = function(number){
        tile[place].pieces--;
        if(tile[place].pieces == 0)
            tile[place].occupied = 'free';
        tile[place-number].pieces++;
        if(tile[place-number].pieces == 0)
            tile[place-number].occupied = color;
    }
} ;


function roll() {
    Math.floor(7 * Math.random());
}

function initializeWhite() {
    p0 = new Piece(0, 'white', 6);
    p1 = new Piece(1, 'white', 6);
    p2 = new Piece(2, 'white', 6);
    p3 = new Piece(3, 'white', 6);
    p4 = new Piece(4, 'white', 6);
    p5 = new Piece(5, 'white', 8);
    p6 = new Piece(6, 'white', 8);
    p7 = new Piece(7, 'white', 8);
    p8 = new Piece(8, 'white', 13);
    p9 = new Piece(9, 'white', 13);
    p10 = new Piece(10, 'white', 13);
    p11 = new Piece(11, 'white', 13);
    p12 = new Piece(12, 'white', 13);
    p13 = new Piece(13, 'white', 24);
    p14 = new Piece(14, 'white', 24);
}

initializeWhite();
p0.move(1);

console.log(tile[5]);


