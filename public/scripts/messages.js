(function(exports){


    exports.T_GAME_WON_BY = "GAME-WON-BY";             
    exports.O_GAME_WON_BY = {
        type: exports.T_GAME_WON_BY,
        data: null
    };

    exports.T_WAITING_FOR_OPPONENT = "WAITING-FOR-OPPONENT";
    exports.O_WAITING_FOR_OPPONENT = {
        type: exports.T_WAITING_FOR_OPPONENT,
        data: null
    }

    exports.T_OPPONENT_FOUND = "OPPONENT-FOUND";
    exports.O_OPPONENT_FOUND = {
        type: exports.T_OPPONENT_FOUND,
        data: null
    }

    exports.T_GAME_CANCELLED = "GAME-CANCELLED";
    exports.O_GAME_CANCELLED = {                          
        type: exports.T_GAME_CANCELLED,
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
        type: exports.T_BLACK_MOVE,
        pieceID: null,
        target: null,
        caputure: null,
        endTurn: false
    }

    exports.T_WHITE_MOVE = "WHITE-MOVE";
    exports.O_WHITE_MOVE = {
        type: exports.T_WHITE_MOVE,
        pieceID: null,
        target: null,
        capture: null,
        endTurn: false
    }

    exports.T_WHITE_CAPTURED_MOVE = "WHITE-CAPTURED-MOVE";
    exports.O_WHITE_CAPTURED_MOVE = {
        type: exports.T_WHITE_CAPTURED_MOVE,
        pieceID: null,
        target: null,
        capture: null,
        endTurn: false
    }

    exports.T_BLACK_CAPTURED_MOVE = "BLACK-CAPTURED-MOVE";
    exports.O_BLACK_CAPTURED_MOVE = {
        type: exports.T_BLACK_CAPTURED_MOVE,
        pieceID: null,
        target: null,
        capture: null,
        endTurn: false
    }

    //White got a point
    exports.T_WHITE_TO_WIN = "WHITE-TO-WIN";
    exports.O_WHITE_TO_WIN = {
        type: exports.T_WHITE_TO_WIN,
        //PieceID
        pieceID: null,
        endTurn: false
    }

    //Black got a point
    exports.T_BLACK_TO_WIN = "BLACK-TO-WIN";
    exports.O_BLACK_TO_WIN = {
        type: exports.T_BLACK_TO_WIN,
        //PieceID
        pieceID: null,
        endTurn: false

    }

    exports.T_ROLLED_DICE = "ROLLED-DICE";
    exports.O_ROLLED_DICE = {
        type : exports.T_ROLLED_DICE,
        data : null
    }

}(typeof exports === "undefined" ? this.Messages = {} : exports));