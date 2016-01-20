//var log = require('libs/log')(module);

module.exports = function(server) {

    var io = require('socket.io')(server);
    io.set('origins', 'localhost:*');
    //io.set('logger', log);

    io.on('connection', function (socket) {

        var username = 'anonim';
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
