function Game(){
    this.players = 0;
    
    
}

Game.prototype.player1 = function(ID1){
    this.ID1 = ID1;
    this.players++;
}

Game.prototype.player2 = function(ID2){
    this.ID2 = ID2;
    this.players++
}

var game1 = new Game();
game1.player1(3);


module.exports = Game;