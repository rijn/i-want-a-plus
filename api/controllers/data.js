const { pipeline, pick } = require('../utils');
const Promise = require('bluebird');
const _ = require('lodash');
const models = require('../../models');
const ProgressBar = require('progress');
const Op = models.Sequelize.Op;

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
                        return models.PastSection.create(
                            _.mapValues(
                                _.pick(item, _.keys(models.PastSection.rawAttributes)),
                                (v, k) => v === 'N/A' ? 0 : v
                            )
                        );
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

exports.importCourse = importCourse = (object, options) => {
    try {
        object = JSON.parse(object.course);
    } catch (e) {
        return new ServerError({ message: 'parsing failed', statusCode: 500 });
    }

    let course, instructors = {};

    let tasks = [
        () => {
            return models.Course.findOrCreate({
                where: _.pick(object, [ 'subject', 'course' ]),
                defaults: { title: object.title, SchoolId: 1 },
                include: [ models.School ]
            }).spread((_course, created) => {
                course = _course;
            });
        },
        () => {
            return models.sequelize.transaction((t) => {
                return Promise.map(object.sections, section => models.Section.upsert(_.assign({},
                    {
                        year: _.toNumber(options.year),
                        term: _.capitalize(options.term),
                        crn: section.crn,
                        section: section.section,
                        CourseId: course.id
                    }
                ), {
                    transaction: t,
                    include: [ models.Course ]
                }));
            });
        },
        () => {
            let _instructors = _.chain(object.sections).map('instructor').reduce((s, a) => _.union(s, a)).value();

            return Promise.map(_instructors, instructor => {
                let names = _.split(instructor, ',');
                return models.Professor.findAll({
                    where: {
                        lastName: _.get(names, '0'),
                        firstName: { [Op.iLike]: _.trim(_.get(names, '1')) + '%' }
                    }
                }).then(professors => {
                    if (professors.length === 1) {
                        instructors[instructor] = professors[0];
                    }
                });
            });
        },
        () => {
            return models.sequelize.transaction({
                deferrable: models.Sequelize.Deferrable.SET_DEFERRED
            }, (t) => {
                return Promise.map(object.sections, sectionData => {
                    let sectionModel;
                    return models.Section.findOne({
                        where: {
                            year: _.toNumber(options.year),
                            term: _.capitalize(options.term),
                            crn: sectionData.crn
                        }
                    }, {
                        transaction: t
                    }).then(_section => {
                        if (!_section) throw null;
                        sectionModel = _section;
                        if (!sectionModel.CurrentSectionId) {
                            return models.CurrentSection.create({
                                availability: _.toNumber(sectionData.status)
                            }, {
                                transaction: t
                            }).then(newCurrentSection => {
                                return sectionModel.setCurrentSection(newCurrentSection, { transaction: t });
                                // return sectionModel.update({ CurrentSectionId: newCurrentSection.id }).then(() => {
                                //     return newCurrentSection;
                                // }, {
                                //     transaction: t
                                // });
                            });
                        } else {
                            return models.CurrentSection.findOne({
                                where: {
                                    id: sectionModel.CurrentSectionId
                                }
                            }, {
                                transaction: t
                            });
                        }
                    }).then(currentSection => {
                        return currentSection.update({
                            availability: _.toNumber(sectionData.status)
                        }, {
                            transaction: t
                        });
                    }).then(() => {
                        return models.Teach.destroy({
                            where: {
                                SectionId: sectionModel.id
                            },
                            force: true,
                            transaction: t
                        });
                    }).then(() => {
                        let bulk = _.compact(_.map(sectionData.instructor, instructor => {
                            if (_.has(instructors, instructor)) {
                                return {
                                    ProfessorId: instructors[instructor].id,
                                    SectionId: sectionModel.id
                                };
                            } else {
                                return null;
                            }
                        }));
                        return models.Teach.bulkCreate(bulk, {
                            validate: true,
                            transaction: t
                        });
                    });
                });
            });
        },
        (res) => {
            console.log(res);
        }
    ];

    return pipeline(tasks);
};
