'use strict';

module.exports = function(app, io) {
    const chatController  = require('../controllers/chatController'),
          dates = require('../tools/dates');

    io.on('connection', function(socket) {
        console.log(socket.handshake.address + ' has connected');

        socket.on('disconnect', function() {
            console.log(socket.handshake.address + ' has disconnected');
        });

        socket.on('chat_message', function(msg) {
            // console.log(socket.conn.remoteAddress);
            console.log(dates.logDate(new Date()) + " : " + msg);
            io.to(msg['room']).emit(
                'chat_message', 
                {
                    timestamp: dates.chatDate(new Date()),
                    username: msg['username'],
                    message: msg['message']
                }
            );
        });

        socket.on('create_chan', function(chan_name) {

        });

        socket.on('leave', function(chan_id) {
            socket.leave(chan_id, function(err) {
                if (err) {
                    socket.to(socket.id).emit('leave', {'chan_id': chan_id, 'err': err});
                } else {
                    socket.to(socket.id).emit('leave', {'chan_id': chan_id});
                }
            });
        })

        socket.on('join', function(chan_id) {
            socket.join(chan_id, function(err) {
                if (err) {
                    socket.to(socket.id).emit('join', {'chan_id': chan_id, 'err': err});
                } else {
                    socket.to(socket.id).emit('join', {'chan_id': chan_id});
                }
            });
        });

        socket.on('invite', function(id, chan) {
            io.to(id).emit('join', chan);
        });
    });
};
