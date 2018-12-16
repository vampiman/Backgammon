function Game(){
    this.players = 0;
    this.points1 = 0;
    this.points2 = 0;
    this.socket1 = null;
    this.socket2 = null;
}

Game.prototype.player1 = function(socket1){
    this.socket1 = socket1;
    this.players++;
}

Game.prototype.player2 = function(socket2){
    this.socket2 = socket2;
    this.players++
}

var game1 = new Game();
game1.player1(3);


module.exports = Game;