var _ = require('lodash');

module.exports = function (apiMethod) {
    return function (req, res, next) {
        var object = req.body;
        var options = _.extend({},
            req.file, {ip: req.ip}, req.query, req.params, req.user,
            {
                context: { },
                mw: {
                    login: req.login
                }
            }
        );

        if (_.isEmpty(object)) {
            object = options;
            options = {};
        }

        return apiMethod(object, options).then(function then (response) {
            if (req.method === 'DELETE') {
                return res.status(204).end();
            }
            if (req.method === 'POST') {
                return res.status(201).send(response);
            }
            if (res.get('Content-Type') && res.get('Content-Type').indexOf('text/csv') === 0) {
                return res.status(200).send(response);
            }

            if (_.isFunction(response)) {
                return response(req, res, next);
            }

            res.json(response || {});
        }).catch(function onAPIError (error) {
            next(error);
        });
    };
};
