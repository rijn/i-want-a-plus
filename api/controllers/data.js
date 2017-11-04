const { pipeline, pick } = require('../utils');
const Promise = require('bluebird');
const _ = require('lodash');
const models = require('../../models');

let extractName = (name) => {
    return {
        lastName: _.trim(_.get(_.split(name, ','), 0)),
        firstName: _.trim(_.get(_.split(name, ','), 1))
    }
}

exports.updateCsv = (options) => {
    let tasks = [
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
        },
        (data) => {
            let head = _.head(data);
            data = _.drop(data, 1);
            return data.map(row => _.zipObject(head, row));
        },
        (data) => {
            return Promise.each(data, item => {
                let professor, course;
                return models.Professor.findOrCreate({
                    where: extractName(item.professor)
                }).then(_professor => {
                    professor = _professor[0];
                }).then(() => {
                    return models.Course.findOrCreate({
                        where: _.pick(item, [ 'year', 'term', 'crn' ]),
                        defaults: _.assign({},
                            _.pick(item, _.keys(models.Course.rawAttributes)),
                            { PastCourse: _.pick(item, _.keys(models.PastCourse.rawAttributes)) }
                        ),
                        include: [ models.PastCourse ]
                    });
                }).then(_course => {
                    course = _course[0];
                }).then(() => {
                    return models.Teach.findOrCreate({
                        where: {
                            CourseId: course.id,
                            ProfessorId: professor.id
                        }
                    });
                });
            });
        },
        (data) => ({ success: data.length })
    ];

    return pipeline(tasks, options);
};
