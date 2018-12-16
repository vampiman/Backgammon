var express = require('express');
var credentials = require("./credentials");
var cookies = require("cookie-parser");
var games = require('../index.js');

var router = express.Router();

router.use(cookies(credentials.cookieSecret));





router.get('/game', (req, res) => {
    res.sendFile('game.html', {root: './public'});
});


module.exports = router;