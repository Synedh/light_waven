'use strict';

module.exports = function(app, io) {
    const mongoose          = require('mongoose'),
          User              = mongoose.model('User'),
          Message           = mongoose.model('Message'),
          userController    = require('../controllers/userController'),
          dates             = require('../tools/dates'),
          logs              = require('../tools/logs'),
          requestTools      = require('../tools/requestTools'),
          gameManager       = require('../game/gameManager');

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
                    logs.logConnection(new Date(), socket.handshake.address + ' has connected has ' + user.login);
                } else {
                    logs.logConnection(new Date(), socket.handshake.address + ' has connected');
                }
            })
        });

        socket.on('disconnect', function(reason) {
            User.findById(this_user_id, function(err, user) {
                if (!err && user) {
                    user.connected = false;
                    user.save();
                    logs.logConnection(new Date(), user.login + ' has disconnected for reason : ' + reason);
                } else {
                    logs.logConnection(new Date(), socket.handshake.address + ' has disconnected for reason : ' + reason);
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
                            logs.logChat(new Date(), msg['channel_name'], err);
                        else {
                            logs.logChat(message.date, msg['channel_name'], user.login + " : \"" + message.content + "\"");
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

        socket.on('challenge', function(challenger, opponent) {
            User.findOne({'login': { $regex: new RegExp(opponent.toLowerCase(), "i") }}, function(err, user) {
                var battle_id = requestTools.generateCustomId();
                if (err) {
                    logs.logBattle(new Date(), battle_id, "Error : " + err);
                    socket.emit('challenge_cancel', err);
                } else if (!user) {
                    logs.logBattle(new Date(), battle_id, challenger + ' : user ' + opponent + ' does not exists.');
                    socket.emit('challenge_cancel', challenger + ' : user ' + opponent + ' does not exists.');
                    socket.leave(battle_id);
                } else if (user.login == challenger) {
                    logs.logBattle(new Date(), battle_id, challenger + ' : you cannot challenge yourself !');
                    socket.emit('challenge_cancel', challenger + ' : you cannot challenge yourself !');
                    socket.leave(battle_id);
                } else if (!user.connected) {
                    logs.logBattle(new Date(), battle_id, challenger + ' : user ' + opponent + ' is not connected.');
                    socket.emit('challenge_cancel', challenger + ' : user ' + opponent + ' is not connected.');
                    socket.leave(battle_id);
                } else {
                    logs.logBattle(new Date(), battle_id, challenger + " challenge " + user.login);
                    socket.join(battle_id);
                    socket.to(user.last_socket_id)
                        .emit('challenge', challenger, battle_id);
                }
            });
        });

        socket.on('challenge_cancel', function(user, opponent, battle_id) {
            User.findOne({'login': { $regex: new RegExp(opponent.toLowerCase(), "i") }}, function(err, opponent) {
                if (err) {
                    logs.logBattle(new Date(), battle_id, "Error : " + err);
                    socket
                        .emit('challenge_cancel', err);
                    socket.to(opponent.last_socket_id)
                        .emit('challenge_cancel', err);
                } else {
                    socket.leave(battle_id);
                    logs.logBattle(new Date(), battle_id, user + " cancelled challenge.");
                    socket
                        .emit('challenge_cancel', null, user + ' cancelled challenge.');
                    socket.to(opponent.last_socket_id)
                        .emit('challenge_cancel', null, user + ' cancelled challenge.');
                }
            });
        });

        socket.on('challenge_accept', function(user, opponent, battle_id) {
            User.findOne({'login': { $regex: new RegExp(opponent.toLowerCase(), "i") }}, function(err, opponent) {
                if (err) {
                    logs.logBattle(new Date(), battle_id, "Error : " + err);
                    socket
                        .emit('challenge_cancel', err);
                    socket.to(opponent.last_socket_id)
                        .emit('challenge_cancel', err);
                } else {
                    logs.logBattle(new Date(), battle_id, user + " started a battle against " + opponent.login);
                    socket.join(battle_id, function() {
                        io.to(battle_id)
                            .emit('challenge_accept', battle_id);
                    });
                }
            });
        });

        socket.on('move', function(battle_id, entity, cell) {
            if (gameManager.move(socket.to(battle_id), entity, cell))
                logs.logBattle(new Date(), battle_id, "move");
            // socket.to(battle_id)
            //     .emit('move', gameManager.move(entity, cell));
        });
    });
};
