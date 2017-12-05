const _ = require('lodash');
const { pipeline, pick, deserialize } = require('../utils');
const { User, Comment, Course, Section, Professor, sequelize: { QueryTypes }, mixin } = require('../../models');
mixin(_);
const { ServerError } = require('../middleware/error-handler');

exports.get = (options) => {
    let tasks = [
        pick([ 'CourseId', 'SectionId', 'id' ]),
        conditions => _.join(_.map(conditions, (v, k) => `cond$${k}=` + _.escape(parseInt(v))), ' AND '),
        (conditions) => {
            return _.query(`
                WITH t AS (
                    SELECT
                      DISTINCT
                      "Comments"."id",
                      "Comments"."id"         AS cond$id,
                      "Comments"."content",
                      "Comments"."rating",
                      "Comments"."createdAt",
                      "Comments"."updatedAt",
                      CASE WHEN "Courses"."id" IS NULL
                        THEN "Sections"."CourseId"
                      ELSE "Courses"."id" END AS cond$CourseId,
                      "Sections"."id"         AS cond$SectionId
                    FROM "Comments"
                      LEFT JOIN "Users"
                        ON "Comments"."UserId" = "Users"."id"
                      LEFT JOIN "Courses"
                        ON "Comments"."CourseId" = "Courses"."id"
                      LEFT JOIN "Sections"
                        ON "Comments"."SectionId" = "Sections"."id"
                )
                SELECT * FROM t
                WHERE ${conditions};
            `, {
                type: QueryTypes.SELECT
            });
        },
        deserialize
    ];

    return pipeline(tasks, options);
};

exports.post = (object, options) => {
    console.log(options);
    let tasks = [
        (options) => {
            return Comment.create(_.assign(
                {
                    UserId: options.mw.user.id
                },
                _.pick(options, 'CourseId', 'SectionId', 'ProfessorId'),
                _.pick(object, 'rating', 'content')
            ), {
                include: [ User, Course, Section, Professor ]
            });
        },
        () => ({})
    ];

    return pipeline(tasks, options);
};

let checkUserAndComment = (CommentId, UserId) => {
    return _.query(`SELECT COUNT(*) as quant
                    FROM "Comments", "Users"
                    WHERE "Comments"."UserId" = "Users"."id"
                        and "Comments"."UserId" = ${UserId}
                        and "Comments"."id" = ${CommentId}`).then((result) => {
                            if (result[0][0].quant == 0){
                                throw ServerError({ message: "Not your comment", statusCode: 400 });
                            }
                            return;
                        });
}

exports.update = (object, options) => {
    let tasks = [
        () => {
            return checkUserAndComment(options.id, options.mw.user.id);
        },
        () => {
            if (object.content && !object.rating ){
              return _.query(`UPDATE "Comments"
                              SET "content" = \'${object.content}\'
                              WHERE "Comments"."id" = ${options.id}`)
              .then((result) => {
                  return "Update Comment Success";
              });
            }
            if (!object.content && object.rating){
              return _.query(`UPDATE "Comments"
                              SET "rating" = \'${object.rating}\'
                              WHERE "Comments"."id" = ${options.id}`)
              .then((result) => {
                  return "Update Rating Success";
              });
            }
            if (object.content && object.rating){
              return _.query(`UPDATE "Comments"
                              SET "content" = \'${object.content}\', "rating" = \'${object.rating}\'
                              WHERE "Comments"."id" = ${options.id}`)
              .then((result) => {
                  return "Update Both Comment and Rating Success";
              });
            }
        }
    ];

    return pipeline(tasks);
};

exports.delete = (options) => {
    let tasks = [
        // todo
        (options) => {
            return checkUserAndComment(options.id, options.mw.user.id);
        },
        () =>{
            return _.query(`DELETE FROM "Comments" WHERE "Comments"."id" = ${options.id}`)
        }

    ];

    return pipeline(tasks, options);
};

exports.getAllMyComments = (options) => {
    let tasks = [
        (options) => {
            console.log(options);
            return options.mw.user.getComments();
        }
    ];

    return pipeline(tasks, options);
};
