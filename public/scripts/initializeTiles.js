
$(() => {
    var counterPosDown = 14;
    var counterPosUp = 2;
    var pieces = [2,0,0,0,0,5,0,3,0,0,0,5,5,0,0,0,3,0,5,0,0,0,0,2];
    /*
    $('.container').append('<div class = "counter' + 1 +'"><p>0</p></div>');
    $('.counter' + i).css('grid-column', '2/3' + counterPos+1);
    $('.counter' + i).css('grid-row','12/13');
    */
    
    $('body').append('<div><button class = "roll">Roll the dice</dice></div>');

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
        $('.tile1-' + i).append('<img class = "black" id = "' + j +'" src = "stylesheets/images/blackPiece.png"></div>')
        $('.tile24-' + i).append('<img class = "white" id = "' + j +'" src = "stylesheets/images/whitePiece.png"></div>')
    }

    for(var i = 1; i <= 5; i++){
        var j = -1 + i;
        $('.tile6-' + i).append('<img class = "white" id = "' + j +'" src = "stylesheets/images/whitePiece.png"></div>')
        $('.tile19-' + i).append('<img class = "black" id = "' + j +'" src = "stylesheets/images/blackPiece.png"></div>')
    }

    for(var i = 1; i <= 3; i++){
        var j = 4 + i;
        $('.tile8-' + i).append('<img class = "white" id = "' + j +'" src = "stylesheets/images/whitePiece.png"></div>')
        $('.tile17-' + i).append('<img class = "black" id = "' + j +'" src = "stylesheets/images/blackPiece.png"></div>')
    }

    for(var i = 1; i <= 5; i++){
        var j = 7 + i;
        $('.tile12-' + i).append('<img class = "black" id = "' + j +'" src = "stylesheets/images/blackPiece.png"></div>')
        $('.tile13-' + i).append('<img class = "white" id = "' + j +'" src = "stylesheets/images/whitePiece.png"></div>')
    }
    
});