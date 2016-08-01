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

        socket.on('game:start', function(cb) {
            socket.join('waitingRoom');
            //console.log(io.sockets.sockets);
            if(socket.adapter.rooms.waitingRoom.length == 3) {
                var scs = socket.adapter.rooms.waitingRoom.sockets;
                var roomName =  JSON.stringify(scs);
                for (var s in scs) {
                    io.sockets.sockets[s].leave('waitingRoom');
                    io.sockets.sockets[s].join(roomName);
                }
                socket.broadcast.to(roomName).emit('message', username, 'GAME BEGIN!');
            } else {
                socket.broadcast.emit('message', username, 'game start');
            }

            cb && cb();
        });

        socket.on('rooms:status', function(cb) {

                socket.emit('rooms:status', username, JSON.stringify(socket.adapter.rooms));

            cb && cb();
        });
    });

    return io;
};

