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
