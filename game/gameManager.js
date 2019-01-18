'use strict';

const logs              = require('../tools/logs');


exports.move = function(battle, entity, cell) {
    /* TODO : CHECK MOVE */ 
    battle.emit('move', entity, cell);
    return true;
}