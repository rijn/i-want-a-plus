const _ = require('lodash');
const { pipeline, pick } = require('../utils');
const models = require('../../models');
const Op = models.Sequelize.Op;

const plusField = [ 'limit', 'offset' ];
const addiField = _.concat([ 'order', 'group' ], plusField);
const likeField = [ 'title' ];
const timeFieldToExclude = {
    exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ]
};
const groupField = {
    'averageGpa': [models.sequelize.fn('AVG', models.sequelize.col('PastCourse.averageGpa'))]
};
const generateModel = (model, as, options) => ({
    model: model,
    required: false,
    attributes: timeFieldToExclude,
    where: { deletedAt: null },
    where: _.chain(options).pick(_.keys(model.rawAttributes).map(key => `${as}.${key}`)).mapKeys((v, k) => _.split(k, '.')[1]).value()
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
                where: { deletedAt: null },
                where: _.pick(_.omit(options, addiField), _.keys(models.Course.rawAttributes)),
                include: [
                    generateModel(models.School, 'Schools', options),
                    generateModel(models.PastCourse, 'PastCourses', options),
                    generateModel(models.CurrentCourse, 'CurrentCourses', options),
                    _.assign(generateModel(models.Professor, 'Professors', options), {
                        duplicating: false,
                        required: true,
                        through: {
                            model: models.Teach,
                            attributes: []
                        }
                    })
                ]
            }, options.group && {
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
}
