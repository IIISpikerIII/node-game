//var passport = module.parent.exports.passport;
var passport;

exports.post = function(req, res, next) {
    passport.authenticate('UserLogin', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure',
        failureFlash: false });
};

/* GET home page. */
exports.get = function(req, res, next) {
    res.render('login', { title: 'Login', message: req.flash('info','wdwdw') });
};
