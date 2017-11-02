module.exports.getBearerAutorizationToken = function (req) {
    var parts,
        scheme,
        token;

    if (req.headers && req.headers.authorization) {
        parts = req.headers.authorization.split(' ');
        scheme = parts[0];

        if (/^Bearer$/i.test(scheme)) {
            token = parts[1];
        }
    } else if (req.query && req.query.access_token) {
        token = req.query.access_token;
    }

    return token;
}
