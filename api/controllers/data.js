const { pipeline, pick } = require('../utils');
const Promise = require('bluebird');
const _ = require('lodash');
const models = require('../../models');
const ProgressBar = require('progress');

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
            let bar = new ProgressBar('  loading [:bar] :rate/eps :percent :current/:total :elapsed/:etas', {
                total: data.length,
                incomplete: ' ',
                head: '>',
                width: 30
            });
            return Promise.each(data, item => {
                let professor, course, section;
                return models.Professor.findOrCreate({
                    where: extractName(item.professor),
                    default: { SchoolId: 1 },
                    include: [ models.School ]
                }).then(_professor => {
                    professor = _professor[0];
                }).then(() => {
                    return models.Course.findOrCreate({
                        where: _.pick(item, [ 'subject', 'course' ]),
                        defaults: { title: item.title, SchoolId: 1 },
                        include: [ models.School ]
                    });
                }).then(_course => {
                    course = _course[0];
                }).then(() => {
                    return models.Section.findOrCreate({
                        where: _.pick(item, [ 'year', 'term', 'crn' ]),
                        defaults: _.assign({},
                            _.pick(item, _.keys(models.Section.rawAttributes)),
                            { CourseId: course.id }
                        ),
                        include: [ models.Course, models.PastSection ]
                    });
                }).then(_section => {
                    section = _section[0];
                    if (!section.PastSectionId) {
                        return models.PastSection.create(_.pick(item, _.keys(models.PastSection.rawAttributes)));
                    }
                }).then(newPastSection => {
                    if (newPastSection) {
                        return section.update({ PastSectionId: newPastSection.id });
                    }
                }).then(() => {
                    return models.Teach.findOrCreate({
                        where: {
                            SectionId: section.id,
                            ProfessorId: professor.id
                        }
                    });
                }).then(() => {
                    bar.tick();
                });
            });
        },
        (data) => {
            console.log('finish loading data');
            return { success: data.length };
        }
    ];

    return pipeline(tasks, options);
};
