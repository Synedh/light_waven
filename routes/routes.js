'use strict';

module.exports = function(app) {
    const indexController = require('../controllers/indexController'),
          chatController  = require('../controllers/chatController'),
          userController = require('../controllers/userController');

    app.route('/')
        .get(indexController.index);

    app.route('/messages')
        .get(chatController.get_messages)
        .post(chatController.create_a_message);

    app.route('/login')
        .post(userController.login);

    app.route('/register')
        .post(userController.register);
};
