//var log = require('libs/log')(module);
var passportSocketIo = require("passport.socketio");
var config = require('../../config');
var sessionStore = require('../../lib/sessionStore');
var cookieParser = require('cookie-parser');
var passport = require('passport');

module.exports = function(server) {

    var io = require('socket.io')(server);
    io.set('origins', 'localhost:*');

    function onAuthorizeSuccess(data, accept){
        console.log('successful connection to socket.io');
        accept(null, true);
    }

    function onAuthorizeFail(data, message, error, accept){
        //if(error)
        //    throw new Error(message);
        console.log('failed connection to socket.io:', message);
        accept(null, false);
    }

    io.use(passportSocketIo.authorize({
          passport:     passport,
          //cookieParser: cookieParser,       // the same middleware you registrer in express
          secret:       config.get('session:secret'),
          key:          config.get('session:key'),
          store:        sessionStore,        // we NEED to use a sessionstore. no memorystore please
          success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
          fail:         onAuthorizeFail     // *optional* callback on fail/error - read more below
      }));

    io.on('connection', function (socket) {

        var username = socket.request.user.username?socket.request.user.username:'anonim';

        socket.broadcast.emit('join', username);

        socket.on('message', function(text, cb) {
            socket.broadcast.emit('message', username, text);
            cb && cb();
        });

        socket.on('disconnect', function() {
            socket.broadcast.emit('leave', username);
        });
    });

    return io;
};

