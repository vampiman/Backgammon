var express = require('express');

var router = express.Router();

router.get('/menu', (req, res) => {
    res.sendFile('menu.html', {root: './public'});
});

router.get('/game', (req, res) => {
    res.sendFile('game.html', {root: './public'});
});

module.exports = router;