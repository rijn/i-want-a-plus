const _ = require('lodash');
const { pipeline, pick } = require('../utils');
const models = require('../../models');
const Op = models.Sequelize.Op;
const { ServerError } = require('../middleware/error-handler');

const plusField = [ 'limit', 'offset' ];
const addiField = _.concat([ 'order', 'group' ], plusField);
const likeField = [ 'title' ];
const timeFieldToExclude = {
    exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ]
};
const groupField = {
    // 'averageGpa': [models.sequelize.fn('AVG', models.sequelize.col('Section.PastSection.averageGpa'))]
};
const generateModel = (model, as, options) => ({
    model: model,
    required: false,
    attributes: timeFieldToExclude,
    where: { deletedAt: null }
    // where: _.chain(options).pick(_.keys(model.rawAttributes).map(key => `${as}.${key}`)).mapKeys((v, k) => _.split(k, '.')[1]).value()
});

exports.get = (options) => {
    let tasks = [
        (options) => _.omit(options, [ 'ip', 'context', 'mw' ]),
        // pick(_.concat(_.keys(models.Course.rawAttributes), addiField)),
        (options) => _.assign(options,
            _.chain(options).pick(likeField).mapValues(option => ({ [Op.like]: `%${option}%` })).value()
        ),
        (options) => {
            return models.Course.findAll(_.assign({
                attributes: timeFieldToExclude,
                where: _.assign({ deletedAt: null },
                    _.mapValues(_.pick(_.omit(options, addiField, likeField), _.keys(models.Course.rawAttributes)), (value, key) =>
                        value.indexOf(',') !== -1
                        ? ({
                            [Op.or]: _.map(_.split(value, ','), v => _.set({}, [Op.eq], v))
                        })
                        : value
                    ),
                    _.pick(options, likeField)
                ),
                include: [
                    generateModel(models.School, 'Schools', options),
                    _.assign(generateModel(models.Section, 'Sections', options), {
                        include: [
                            generateModel(models.PastSection, 'PastSections', options),
                            generateModel(models.CurrentSection, 'CurrentSections', options),
                            _.assign(generateModel(models.Professor, 'Professors', options), {
                                duplicating: false,
                                required: true,
                                through: {
                                    model: models.Teach,
                                    attributes: []
                                }
                            })
                        ]
                    })
                ]
            }, options.group && false && {
                attributes: _.concat(_.keys(_.omit(options, addiField)), _.split(options.group, ','), _.map(groupField, (v, k) => _.concat(v, [k]))),
                group: _.split(options.group, ',')
            }, options.order && {
                order: _.split(options.order, ';').map(order => {
                    let list = _.split(order, ',');
                    if (_.has(groupField, list[0])) {
                        list = _.concat(_.get(groupField, list[0]), _.drop(list, 1));
                    }
                    return list;
                })
            }, _.mapValues(_.pick(options, plusField), v => _.toInteger(v))));
        }
    ];

    return pipeline(tasks, options);
};

exports.getById = (options) => {
    let tasks = [
        (options) => {
            return models.Course.findOne(_.assign({
                attributes: timeFieldToExclude,
                where: { id: options.id, deletedAt: null },
                include: [
                    generateModel(models.School, 'Schools', options),
                    _.assign(generateModel(models.Section, 'Sections', options), {
                        include: [
                            generateModel(models.PastSection, 'PastSections', options),
                            generateModel(models.CurrentSection, 'CurrentSections', options),
                            _.assign(generateModel(models.Professor, 'Professors', options), {
                                duplicating: false,
                                required: true,
                                through: {
                                    model: models.Teach,
                                    attributes: []
                                }
                            })
                        ]
                    })
                ]
            }));
        },
        (data) => {
            if (!data) {
                throw new ServerError({ message: 'No course found', statusCode: 404 });
            }
            return data;
        }
    ];

    return pipeline(tasks, options);
};
