var user = require('../models/user.js').User;
var passport = require('../models/user.js').User;

exports.post = function(req, res, next) {
    passport.authenticate('UserLogin', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure',
        failureFlash: false });
};

exports.get = function(req, res, next) {
    res.render('login', { title: 'Login'});
};

exports.registration = function(req, res, next) {
    res.render('registration', { title: 'Registration'});
};

exports.registrationPost = function(req, res, next) {
    user.registration(req.body.username, req.body.password,function(err, user){
        if(!err) {
            passport.authenticate('UserLogin', {
                successRedirect: '/loginSuccess',
                failureRedirect: '/loginFailure',
                failureFlash: false });
        }
    });
    //res.render('registration', { title: 'Registration'});
};