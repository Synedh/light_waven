'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: String,
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
},
{
    toJSON: { 
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});


module.export = mongoose.model('Message', messageSchema);
    