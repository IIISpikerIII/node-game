module.exports = function(app) {
    app.get('/', require('./main'));
    app.get('/users', require('./users'));
    app.get('/chat', require('./chat'));
    //app.post('/login', require('./login').post);
    //app.post('/logout', require('./logout').post);
    //app.get('/chat', checkAuth, require('./chat').get);
    //app.get('/user/:id', function(req, res, next) {
    //
    //    try {
    //        var id = new ObjectID(req.params.id)
    //    } catch (e) {
    //        return next(404);
    //    }
    //
    //    User.findById(id, function(err, user) {
    //        if(err) return next(err);
    //        if(!user) {
    //            next(new HttpError(404, "User not found"));
    //        }
    //        res.json(user);
    //    });
    //});
};