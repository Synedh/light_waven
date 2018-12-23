'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    channel_type: {
        type: String,
        enum: ['general', 'battle', 'private'],
        required: true
    },
    users: {
        type: [String]
    }
});

messageSchema.pre('save', function(next) {
    if (this.channel_type == 'general' && this.users.length > 0) {
        next('Incorrect number of user(s) with channel type ' + this.channel_type + '.');
    }
    next();
});


module.export = mongoose.model('Message', messageSchema);
    