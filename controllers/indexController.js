'use strict';

exports.index = function(req, res) {
    if (req.session.user)
        var jsonUser = JSON.stringify(req.session.user);
    else
        var jsonUser = JSON.stringify({});
    res.render('index.html', { user: req.session.user, jsonUser: jsonUser });
}

exports.disconnect = function(req, res) {
    User.findOne({'login': req.session.user.login }, function(err, user) {
        if (err)
            req.json(err);
        user.connected = false;
        user.save()
        req.session.destroy(
            function (err) {
                if (err)
                    req.json(err);
        });
        res.json({ action: 'ok' });
    });
}