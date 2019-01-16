'use strict';

var mongoose    = require('mongoose'),
    User        = mongoose.model('User'),
    reqTools    = require('../tools/requestTools');

exports.list_all_users = function(req, res) {
    User.find(req.query, 'login email connected used_ips created_on last_connection date', function(err, user) {
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
    User.findOne({'login': { $regex: new RegExp(req.body['login'].toLowerCase(), "i") } }, function(err, user) {
        if (err)
            res.json(err);
        if (!user)
            res.json(false);
        user.comparePassword(req.body['password'], function(err, okPass) {
            if (err)
                res.json(err);
            if (okPass) {
                var ipIndex = user.used_ips.indexOf(reqTools.getClientIp(req));
                if (ipIndex >= 0) {
                     user.used_ips.splice(ipIndex, 1);
                }
                user.used_ips.push(reqTools.getClientIp(req));
                user.connected = true;
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
            res.json({ error: err });
        else {
            user.used_ips.push(reqTools.getClientIp(req));
            user.connected = true;
            user.save();
            req.session.user = {
                'id': user.id,
                'login': user.login,
                'email': user.email
            };
            res.json(user);
        }
    });
};