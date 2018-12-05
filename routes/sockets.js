'use strict';

module.exports = function(app, io) {
    const chat  = require('../controllers/chat'),
          dates = require('../tools/dates');

    io.on('connection', function(socket) {
        console.log('a user connected');

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('chat_message', function(msg){
            // console.log(socket.conn.remoteAddress);
            console.log(dates.logDate(new Date()) + " message : " + msg);
            io.emit(
                'chat_message', 
                {
                    timestamp: dates.chatDate(new Date()),
                    username: "",
                    message: msg
                }
            );
        });
    });
};
