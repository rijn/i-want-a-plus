const _ = require('lodash');
const utils = require('../utils');
const { pipeline, pick, deserialize } = require('../utils');
const { User, Comment, Course, Section, Professor, sequelize: { QueryTypes }, mixin } = require('../../models');
mixin(_);
const { ServerError } = require('../middleware/error-handler');

exports.getAllMyFavorite = (options) => {
    console.log(options)
    let tasks = [
        (options) => {
            return _.query(`
                SELECT
                  "Favorites"."id" as id,
                  "Professors".id as "Professor_id", "Professors"."firstName" as "Professor_firstName", "Professors"."lastName" as "Professor_lastName",
                  "Courses".id as "Course_id",
                  "Sections".id as "Section_id",
                  "c2"."id" as "Section_Course_id", "c2"."title" as "Section_Course_title"
                FROM "Favorites"
                  LEFT JOIN "Professors"
                    ON "Favorites"."ProfessorId" = "Professors".id
                  LEFT JOIN "Courses"
                    ON "Favorites"."CourseId" = "Courses".id
                  LEFT JOIN "Sections"
                    ON "Favorites"."SectionId" = "Sections".id
                  LEFT JOIN "Courses" as c2
                    ON "Favorites"."SectionId" IS NOT NULL AND "Sections"."CourseId" = "c2".id
                WHERE "Favorites"."UserId" = ${options.mw.user.id};
            `, {
                type: QueryTypes.SELECT
            });
        },
        deserialize
    ];

    return pipeline(tasks, options);
};

exports.delete = (options) => {
    let tasks = [
        (options) => {
            return _.query(`
                SELECT "UserId", id
                FROM "Favorites"
                WHERE "Favorites".id = ${_.toNumber(options.id)};
            `, {
                type: QueryTypes.SELECT
            });
        },
        (result) => {
            if (!result[0]) {
                throw new ServerError({ message: "key error", statusCode: 404 });
            }
            if (result[0].UserId == options.mw.user.id){
                return result[0].id;
            } else {
                throw new ServerError({ message: "Not your notification", statusCode: 409 });
            }
        },
        (id) => {
            return _.query(`
                DELETE FROM "Favorites"
                WHERE "Favorites".id = ${id};
            `, {
                type: QueryTypes.DELETE
            });
        },
        () => {}
    ];

    return pipeline(tasks, options);
};

exports.post = (object, options) => {
    let tasks = [
        (options) => {
            if (_.chain(object).keys().intersection([ 'ProfessorId', 'CourseId', 'SectionId' ]).isEmpty().value()) {
                throw new ServerError({ message: 'invalid args', statusCode: 400 })
            }
            return _.assign({ UserId: options.mw.user.id }, object);
        },
        (params) => {
            return _.query(`
                INSERT INTO "Favorites" (` + _.map(params, (v, k) => `"${k}"`).join(',') + `) VALUES (` + _.fill(Array(_.keys(params).length), '?').join(',') + `);
            `, {
                raw: true,
                replacements: _.map(_.values(params), _.toNumber),
                type: QueryTypes.INSERT
            }).then(() => {}).catch(e => {
                throw new ServerError({ message: 'key error', statusCode: 400 })
            });
        }
    ];

    return pipeline(tasks, options);
};
