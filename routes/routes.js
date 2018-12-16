var express = require('express');
var credentials = require("./credentials");
var cookies = require("cookie-parser");

var router = express.Router();

router.use(cookies(credentials.cookieSecret));

router.get('/menu', (req, res) => {
    var visited = 1;
    if(req.cookies.Visits == undefined)
        visited = 1;
    else
        visited = parseInt(req.cookies.Visits) + 1;
    // res.sendFile('menu.html', {headers: {
    //                             "Set-Cookie": `Visited = 0; Expires = ${new Date('2020')}; HttpOnly; Signed = true`,
    //                             }, root: "./public"});
    console.log(visited);
    res.cookie("Visits", visited);
    res.sendFile('menu.html', {root: "./public"});
});

router.get('/game', (req, res) => {
    res.sendFile('game.html', {root: './public'});
});


module.exports = router;