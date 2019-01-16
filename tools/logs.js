'use strict';

var logConnectionFile = null;
var logChatFile = null;
var logBattleFile = null;
var dates = require('../tools/dates');

exports.logConnection = function(date, message) {
    if (!logConnectionFile) {
        console.log(dates.logDate(new Date()) + " - connection - " + message);
    } else {

    }
}

exports.logChat = function(date, chat_id, message) {
    if (!logChatFile) {
        console.log(dates.logDate(new Date()) + " - chat " + chat_id + " - " + message);
    } else {
        
    }
}

exports.logBattle = function(date, battle_id, message) {
    if (!logBattleFile) {
        console.log(dates.logDate(new Date()) + " - battle " + battle_id + " - " + message);
    } else {
        
    }
}