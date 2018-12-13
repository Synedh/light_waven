'use strict';

var mongoose    = require('mongoose'),
    Message     = mongoose.model('Message');

exports.get_messages = function(req, res) {
    Message.find(req.query, function(err, message) {
        if (err)
            res.send(err);
        res.json(message);
    });
}

exports.create_a_message = function(req, res) {
  var new_message = new Message(req.body);
  new_message.save(function(err, message) {
    if (err)
        res.send(err);
    res.json(message);
  });
};
