'use strict';

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.chatDate = function(date) {
    var h = pad(date.getHours(), 2);
    var min = pad(date.getMinutes(), 2);
    return "[" + h + ":" + min + "]";
}

exports.logDate = function(date) {
    var h = pad(date.getHours(), 2);
    var min = pad(date.getMinutes(), 2);
    var s = pad(date.getSeconds(), 2);
    return "[" + h + ":" + min + ":" + s + "]";
}