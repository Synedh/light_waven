'use strict';

var mongoose    = require('mongoose'),
    User        = mongoose.model('User'),
    req_tools   = require('../tools/request_tools');

exports.list_all_users = function(req, res) {
    User.find(req.query, 'login email', function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.read_a_user = function(req, res) {
    User.findById(req.params.userId, 'login email', function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.update_a_user = function(req, res) {
    User.findByIdAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.delete_a_user = function(req, res) {
    User.deleteOne({_id: req.params.userId}, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted.' });
    });
};


exports.login = function(req, res) {
    User.findOne({'login': req.body['login']}, function(err, user) {
        if (err)
            res.json(err);
        if (!user)
            res.json(false);
        user.comparePassword(req.body['password'], function(err, okPass) {
            if (err)
                res.json(err);
            if (okPass) {
                user.used_ips.push(req_tools.getClientIp(req));
                user.save();
                req.session.user = {
                    'id': user.id,
                    'login': user.login,
                    'email': user.email
                };
            }
            res.json(okPass);
        });
    });
};


exports.register = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.json(err);
        res.json(true);
    });
};