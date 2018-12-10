(function(exports){


    exports.T_GAME_WON_BY = "GAME-WON-BY";             
    exports.O_GAME_WON_BY = {
        type: exports.T_GAME_WON_BY,
        data: null
    };

    exports.O_GAME_CANCELLED = {                          
        type: "GAME-CANCELLED",
        //TO DECLARE THE WINNER, THE ONE WHO LEFT JUST LOST
        data: null
    };
    
    exports.S_GAME_CANCELLED = JSON.stringify(exports.O_GAME_CANCELLED);

    exports.T_BEGIN = "BEGIN";
    exports.O_BEGIN = {
        type: "BEGIN",
        //PLAYER COLOR
        data: null
    }

    exports.T_PLAYER_JOINED = "PLAYER-JOINED";
    exports.O_PLAYER_JOINED = {
        type: exports.T_PLAYER_JOINED,
        data: null
    }

    exports.T_BLACK_MOVE = "BLACK-MOVE";
    exports.O_BLACK_MOVE = {
        type : exports.T_BLACK_MOVE,
        data : {
            pieceID : null,
            target : null
        }
    }

    exports.T_WHITE_MOVE = "WHITE-MOVE";
    exports.O_WHITE_MOVE = {
        type : exports.T_WHITE_MOVE,
        data : {
            pieceID : null,
            target : null
        }
    }

    exports.T_ROLLED_DICE = "ROLLED-DICE";
    exports.O_ROLLED_DICE = {
        type : exports.T_ROLLED_DICE,
        data : {
            //PLAYER 1 ("1") OR PLAYER 2 ("2")
            player : null,
            dices : []
        }
    }

}(typeof exports === "undefined" ? this.Messages = {} : exports));