'use strict';

module.exports = function(app) {
    const index = require('../controllers/index'),
          chat  = require('../controllers/chat');

    app.route('/')
        .get(index.index);

    app.route('/messages')
        .get(chat.get_messages)
        .post(chat.create_a_message);
};
