'use strict';

exports.index = function(req, res) {
    if (req.session.user)
        var jsonUser = JSON.stringify(req.session.user);
    else
        var jsonUser = JSON.stringify({});
    res.render('index.html', { user: req.session.user, jsonUser: jsonUser });
}

exports.disconnect = function(req, res) {
    req.session.destroy(
        function (err) {
            if (err)
                req.json(err);
    });
    res.json({ action: 'ok' });
}