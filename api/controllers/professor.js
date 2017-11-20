const _ = require('lodash');
const fp = require('lodash/fp');
const { pipeline, pick, deserialize } = require('../utils');
const {
    User, Comment, Course, Section, PastSection, CurrentSection, Professor, Teach,
    sequelize: { QueryTypes }, mixin, Sequelize, utils: { SectionReducer }
} = require('../../models');
mixin(_);
const Op = Sequelize.Op;
const { ServerError } = require('../middleware/error-handler');

const timeFieldToExclude = {
    exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ]
};
const generateModel = (model, as, options) => ({
    model: model,
    required: false,
    attributes: timeFieldToExclude,
    where: { deletedAt: null }
});

exports.ac = (options) => {
    let tasks = [
        pick([ 'query' ]),
        ({ query }) => {
            return _.query(`
                SELECT
                  id, "firstName", "lastName"
                FROM
                  "Professors"
                WHERE
                  "deletedAt" IS NULL
                  AND CONCAT("lastName", ' ', "firstName", ' ', "lastName", ', ', "firstName") ~* '${query}'
                LIMIT 20;
            `, {
                type: QueryTypes.SELECT
            });
        }
    ];

    return pipeline(tasks, options);
};

exports.getById = (options) => {
    let tasks = [
        (options) => {
            return Professor.findOne(_.assign({
                attributes: timeFieldToExclude,
                where: { id: options.id, deletedAt: null },
                include: [
                    _.assign(generateModel(Section, 'Sections', options), {
                        include: [
                            generateModel(Course, 'Courses', options),
                            generateModel(PastSection, 'PastSections', options),
                            generateModel(CurrentSection, 'CurrentSections', options),
                        ],
                        through: {
                            model: Teach,
                            attributes: []
                        }
                    })
                ]
            }));
        },
        (data) => {
            if (!data) {
                throw new ServerError({ message: 'No professor found', statusCode: 404 });
            }
            data = _.assign({}, data.toJSON());
            _.each(data.Sections, section => section.CourseId = _.get(section, 'Course.id'));
            let cMap = {};
            _.each(data.Sections, section => {
                cMap[section.Course.id] = section.Course;
                delete section.Course;
            });
            data.Courses = _.chain(cMap).values().map(course => _.assign(course, {
                Sections: _.filter(data.Sections, ['CourseId', course.id])
            })).value();
            delete data.Sections;
            _.each(data.Courses, course => {
                course = _.assign(course,
                    _.pick(SectionReducer(course.Sections), ['totalStudentCount', 'averageGpa', 'sd'])
                );
            });
            return data;
        }
    ];

    return pipeline(tasks, options);
};
