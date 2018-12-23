'use strict';

module.exports = function(app, io) {
    const mongoose          = require('mongoose'),
          User              = mongoose.model('User'),
          Message           = mongoose.model('Message'),
          userController    = require('../controllers/userController'),
          dates             = require('../tools/dates');

    io.on('connection', function(socket) {
        console.log(socket.handshake.address + ' has connected');
        socket.join('general', function(err) {
            if (err)
                console.log("Couln't joint general channel : " + err);
        });

        socket.on('disconnect', function() {
            console.log(socket.handshake.address + ' has disconnected');
        });

        socket.on('chat_message', function(msg) {
            // console.log(socket.conn.remoteAddress);
            User.findById(msg['user_id'], function(err, user) {
                if (err)
                    console.log(err);
                else {
                    var new_message = new Message({
                        content: msg['message'],
                        sender: user,
                        date: new Date(),
                        channel_type: msg['channel_type'],
                        users: msg['channel_users']
                    })
                    new_message.save(function(err, message) {
                        if (err)
                            console.log(err);
                        else {
                            console.log(dates.logDate(message.date) + " " + user.login + " : " + message);
                            io.to(msg['channel_name']).emit(
                                'chat_message', 
                                {
                                    timestamp: dates.chatDate(message.date),
                                    username: user.login,
                                    message: message.content
                                }
                            );
                        }
                    });
                }
            });

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
