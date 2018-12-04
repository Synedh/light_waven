'use strict';

exports.index = function(req, res) {
    res.render('index.html', { username: 'Synedh' });
}
