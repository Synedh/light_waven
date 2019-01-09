    'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    connected: {
        type: Boolean,
        default: false
    },
    last_socket_id: {
        type: String
    },
    used_ips: {
        type: [String],
        default: []
    },
    created_on: {
        type: Date,
        default: new Date()
    },
    last_connection_date: {
        type: Date,
    }
});

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isNew) {
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!user.email.match(mailFormat)) {
                return next('Incorrect email format');
            }
            return next();
        });
    } else if (user.isModified('password')) {
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            return next();  
        });
    } else if (user.isModified('email')) {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!user.email.match(mailFormat)) {
            return next('Incorrect email format');
        }
        return next();
    } else {
        return next();
    }
});
 
userSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return next(err);
        }
        next(null, isMatch);
    });
};


module.export = mongoose.model('User', userSchema);
    