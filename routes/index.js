var express = require('express');
var router = express.Router();

router.get('/', require('./main'));

//login
var login = require('./login');
router.get('/login', login.get);
router.post('/login', login.post);

//game
var game = require('./game');
router.get('/game', game.get);

//game
var users = require('./users');
router.get('/users', users.get);

router.get('/loginFailure', function(req, res, next) {
    res.send('Failed to authenticate');
});
router.get('/loginSuccess', function(req, res, next) {
    res.send('Successfully authenticated');
});

module.exports = router;