function Game(){
    this.players = 0;
    
    
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