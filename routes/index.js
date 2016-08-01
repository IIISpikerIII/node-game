var express = require('express');
var router = express.Router();

//middlewares
var mdlUsername = require("../middlewares/username");

var main = require('./main');
router.get('/', [main.get]);

//login
var users = require('./users');
router.get('/login', users.get);
router.post('/login', users.post);
router.get('/registration', users.registration);
router.post('/registration', users.registrationPost);

//game
var game = require('./game');
router.get('/game', game.get);


router.get('/loginFailure', function (req, res, next) {
    res.send('Failed to authenticate');
});
router.get('/loginSuccess', [main.get]);

module.exports = router;