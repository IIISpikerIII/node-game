var User = require('../models/user.js').User;
module.exports = function(req, res, next) {

    if(req.session.passport) {
        User.getUsername(req.session.passport.user, function (err, username) {
            if (err) {
                next(err);
            } else {
                res.locals.username = username;
                next();
            }
        });
    } else {
        res.locals.username = false;
        next();
    }
};