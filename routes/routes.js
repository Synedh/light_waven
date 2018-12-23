'use strict';

module.exports = function(app) {
    const indexController = require('../controllers/indexController'),
          messageController  = require('../controllers/messageController'),
          userController  = require('../controllers/userController');

    app.route('/')
        .get(indexController.index);

    app.route('/disconnect')
        .get(indexController.disconnect);

    app.route('/messages')
        .get(messageController.get_messages)
        .post(messageController.create_a_message);

    app.route('/login')
        .post(userController.login);

    app.route('/register')
        .post(userController.register);

    app.route('/users')
        .get(userController.list_all_users)
        .post(userController.create_a_user);

    app.route('/users/:userId')
        .get(userController.read_a_user)
        .put(userController.update_a_user)
        .delete(userController.delete_a_user);
};
