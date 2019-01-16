'use strict';

exports.getClientIp = function (req) {
    var ipAddress = null;
    var forwardedIpsStr = req.headers['x-forwarded-for'];
    if (forwardedIpsStr)
        ipAddress = forwardedIpsStr[0];
    if (!ipAddress)
        ipAddress = req.connection.remoteAddress;
    return ipAddress;
};

exports.generateCustomId = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 16; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}