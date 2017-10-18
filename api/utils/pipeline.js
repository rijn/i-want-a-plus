const Promise = require('bluebird');

const pipeline = (tasks = []) => {
    var args = Array.prototype.slice.call(arguments, 1);

    var runTask = function (task, args) {
        runTask = function (task, arg) {
            return task(arg);
        };

        return task.apply(null, args);
    };

    return Promise.all(args).then((args) => {
        return Promise.reduce(tasks, (arg, task) => {
            return runTask(task, arg);
        }, args);
    });
};

module.exports = pipeline;
