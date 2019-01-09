'use strict';

module.exports = function(app, io) {
    const mongoose          = require('mongoose'),
          User              = mongoose.model('User'),
          Message           = mongoose.model('Message'),
          userController    = require('../controllers/userController'),
          dates             = require('../tools/dates');

    io.on('connect', function(socket) {
        var this_user_id = null;
        socket.emit('refresh_user');

        socket.join('general', function(err) {
            if (err)
                console.log("Couln't joint general channel : " + err);
        });

        socket.on('refresh_user', function(user_id) {
            User.findById(user_id, function(err, user) {
                if (!err && user) {
                    this_user_id = user_id;
                    user.last_socket_id = socket.id;
                    user.connected = true;
                    user.save();
                    console.log(dates.logDate(new Date()) + " " + socket.handshake.address + ' has connected has ' + user.login);
                } else {
                    console.log(dates.logDate(new Date()) + " " + socket.handshake.address + ' has connected');
                }
            })
        });

        socket.on('disconnect', function(reason) {
            User.findById(this_user_id, function(err, user) {
                if (!err && user) {
                    user.connected = false;
                    user.save();
                    console.log(dates.logDate(new Date()) + " " + user.login + ' has disconnected for reason : ' + reason);
                } else {
                    console.log(dates.logDate(new Date()) + " " + socket.handshake.address + ' has disconnected for reason : ' + reason);
                }
            });
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

        socket.on('challenge', function(values) {
            console.log(dates.logDate(new Date()) + " " + values.challenger + " challenge " + values.opponent);
            User.findOne({'login': { $regex: new RegExp(values.opponent.toLowerCase(), "i") }}, function(err, user) {
                if (err) {
                    socket.emit('challenge_cancel', { error: err });
                } else if (!user) {
                    socket.emit('challenge_cancel', { error: 'User ' + values.opponent + ' does not exists.' });
                } else if (user.login == values.challenger) {
                    socket.emit('challenge_cancel', { error: 'You cannot challenge yourself !' });
                } else if (!user.connected) {
                    socket.emit('challenge_cancel', { error: 'User ' + values.opponent + ' is not connected.' });
                } else {
                    console.log(dates.logDate(new Date()) + " " + values.challenger + " challenge " + user.login);
                    socket.to(user.last_socket_id)
                        .emit('challenge', { username: values.challenger })
                }
            });
        });

        socket.on('challenge_cancel', function(values) {
            User.findOne({'login': { $regex: new RegExp(values.opponent.toLowerCase(), "i") }}, function(err, user) {
                if (err) {
                    socket.to(user.last_socket_id)
                        .emit('challenge_cancel', { error: err });
                } else {
                    socket.to(user.last_socket_id)
                        .emit('challenge_cancel', { message: 'User cancelled challenge.' });
                }
            });
        });

        socket.on('challenge_accept', function(values) {
            User.findOne({'login': { $regex: new RegExp(values.opponent.toLowerCase(), "i") }}, function(err, user) {
                if (err) {
                    socket.to(user.last_socket_id)
                        .emit('challenge_cancel', { error: err });
                } else {
                    console.log(dates.logDate(new Date()) + " " + values.opponent + " started a battle against " + values.challenger)
                    socket.to(user.last_socket_id)
                        .emit('challenge_accept', { message: true });
                }
            });
        });
    });
};
