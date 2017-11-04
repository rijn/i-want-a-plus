const { pipeline, pick } = require('../utils');
const { Accesstoken, User } = require('../model-helper');
const Promise = require('bluebird');

exports.updateCsv = (options) => {
    let tasks = [
        // TODO: schema check
        // TODO: data pickup
        pick([ 'csv' ]),
        (options) => {
            return new Promise((resolve) => {
                let parser = require('csv-parse')({ delimiter: ',' }, (err, data) => {
                    resolve(data);
                });
                let stream = new (require('stream').Readable);
                stream._read = () => {};
                stream.push(options.csv.buffer);
                stream.push(null);
                stream.pipe(parser);
            });
        }
    ];

    return pipeline(tasks, options);
}
