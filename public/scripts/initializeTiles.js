
$(() => {
    var counterPosDown = 14;
    var counterPosUp = 2;
    var pieces = [2,0,0,0,0,5,0,3,0,0,0,5,5,0,0,0,3,0,5,0,0,0,0,2];
    
    //$('body').append('<div><button class = "roll">Roll the dice</dice></div>');
    $('.right').append('<p id="rolled"></p>');
    $('body').append('<button onclick = "capBlack(this)" id = "blackPoint">Cap the black piece</button>');
    $('body').append('<button onclick = "capWhite(this)" id = "whitePoint">Cap the white piece</button>');

    //Initialize captured counters
    $('.container').append('<div class = "capturedBlackCounter"><p id = "blackCaptureCount">0</p></div>');
    $('.capturedBlackCounter').css('grid-column', '8/9');
    $('.capturedBlackCounter').css('grid-row', '12/13');
    $('.capturedBlackCounter').css('text-align','center');

    $('.container').append('<div class = "capturedWhiteCounter"><p id = "whiteCaptureCount">0</p></div>');
    $('.capturedWhiteCounter').css('grid-column', '8/9');
    $('.capturedWhiteCounter').css('grid-row', '1/2');
    $('.capturedWhiteCounter').css('text-align','center');

    //Initialize captured spots
    //The image <img onclick = "selectCapturedBlack(this)" class="black" src = "stylesheets/images/blackPiece.png">
    //<img onclick = "selectCapturedWhite(this)" class="white" src = "stylesheets/images/whitePiece.png">
    $('.container').append('<div class = "capturedBlackSpot"></div>');
    $('.capturedBlackSpot').css('grid-column', '8/9');
    $('.capturedBlackSpot').css('grid-row', '10/11');
    $('.capturedBlackSpot').css('text-align','center');

    $('.container').append('<div class = "capturedWhiteSpot"></div>');
    $('.capturedWhiteSpot').css('grid-column', '8/9');
    $('.capturedWhiteSpot').css('grid-row', '3/4');
    $('.capturedWhiteSpot').css('text-align','center');


    //Initialize the counters
    for(var i = 1; i <= 12; i++){
        var j = i + 12;
        if(pieces[i-1] != 0 )
            $('.container').append('<div class = "counter' + i + '"><p id = "count' + i + '">' + pieces[i-1] + '</p></div>');
        else
            $('.container').append('<div class = "counter' + i + '"><p id = "count' + i + '">0</p></div>');
        if(pieces[j-1] != 0)
            $('.container').append('<div class = "counter' + j + '"><p id = "count' + j + '">' + pieces[j-1] + '</p></div>');
        else
            $('.container').append('<div class = "counter' + j + '"><p id = "count' + j + '">0</p></div>');
        if(i == 7)
            counterPosDown--;
        if(j == 19)
            counterPosUp++;
        var counterPosDown1 = counterPosDown + 1;
        var counterPosUp1 = counterPosUp + 1;
        $('.counter' + i).css('grid-column', counterPosDown + '/' + counterPosDown1);
        $('.counter' + j).css('grid-column', counterPosUp + '/' + counterPosUp1);
        counterPosDown--;
        counterPosUp++;
        $('.counter' + i).css('grid-row','12/13');
        $('.counter' + i).css('text-align','center');
        $('.counter' + j).css('grid-row','1/2');
        $('.counter' + j).css('text-align','center');
    }

    var x = 14;
    var y = 11;
    
    //Initialize tiles on the lower part of the board
    for(var i = 1; i <= 12; i++){
        for(var j = 1; j <= 5; j++){
            $('.container').append('<div class = "tile' + i + '-' + j + '"></div>');

            var x1 = x + 1;
            var y1 = y + 1;
            $('.tile' + i + '-' + j).css('grid-column', x + '/' + x1);
            $('.tile' + i + '-' + j).css('grid-row', y + '/' + y1);
            y--;
            
                
            if(y == 6)
                y = 11;
        }
        x--;
        if(x == 8)
            x--;
    }

    x = 2;
    y = 2;

    //Intitialize tiles on upper part of the board
    for(var i = 13; i <= 24; i++){
        for(var j = 1; j <= 5; j++){
            $('.container').append('<div class = "tile' + i + '-' + j + '"></div>');

            var x1 = x + 1;
            var y1 = y + 1;
            $('.tile' + i + '-' + j).css('grid-column', x + '/' + x1);
            $('.tile' + i + '-' + j).css('grid-row', y + '/' + y1);
            y++;
            
                
            if(y == 7)
                y = 2;
        }
        x++;
        if(x == 8)
            x++;
    }

    x = 14;
    y = 11;

    for(var i = 1; i <= 2; i++){
        var j = 12 + i;
        $('.tile1-' + i).append('<img onclick="selectBlackPiece(this)" class = "black" id = "' + j +'" src = "stylesheets/images/blackPiece.png"></div>')
        $('.tile24-' + i).append('<img onclick="selectWhitePiece(this)" class = "white" id = "' + j +'" src = "stylesheets/images/whitePiece.png"></div>')
    }

    for(var i = 1; i <= 5; i++){
        var j = -1 + i;
        $('.tile6-' + i).append('<img onclick="selectWhitePiece(this)" class = "white" id = "' + j +'" src = "stylesheets/images/whitePiece.png"></div>')
        $('.tile19-' + i).append('<img onclick="selectBlackPiece(this)" class = "black" id = "' + j +'" src = "stylesheets/images/blackPiece.png"></div>')
    }

    for(var i = 1; i <= 3; i++){
        var j = 4 + i;
        $('.tile8-' + i).append('<img onclick="selectWhitePiece(this)" class = "white" id = "' + j +'" src = "stylesheets/images/whitePiece.png"></div>')
        $('.tile17-' + i).append('<img onclick="selectBlackPiece(this)" class = "black" id = "' + j +'" src = "stylesheets/images/blackPiece.png"></div>')
    }

    for(var i = 1; i <= 5; i++){
        var j = 7 + i;
        $('.tile12-' + i).append('<img onclick="selectBlackPiece(this)" class = "black" id = "' + j +'" src = "stylesheets/images/blackPiece.png"></div>')
        $('.tile13-' + i).append('<img onclick="selectWhitePiece(this)" class = "white" id = "' + j +'" src = "stylesheets/images/whitePiece.png"></div>')
    }
    
});