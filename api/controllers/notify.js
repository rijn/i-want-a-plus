const _ = require('lodash');
const utils = require('../utils');
const { pipeline, pick, deserialize } = require('../utils');
const { Notify, CurrentSection, User, Comment, Course, Section, Professor, sequelize: { QueryTypes }, mixin } = require('../../models');
mixin(_);
const { ServerError } = require('../middleware/error-handler');

exports.getAllCourses = (options) => {
    let tasks = [
        (options) => {
            return _.query(`
              SELECT
                "Notifies"."id" as id,
                "CurrentSections"."id" as "Course_id", "CurrentSections"."instructor" as "Professor_Name",
                "CurrentSections"."subject" as "Course_subject"，
                "CurrentSections"."section" as "Course_section"，
                "CurrentSections"."status" as "Course_status"，

              FROM "Notifies"
                LEFT JOIN "CurrentSections"
                  ON "Notifies"."SectionId" = "CurrentSections".id

              WHERE "Notifies"."UserId" = ${options.mw.user.id};

            `, {
                type: QueryTypes.SELECT
            });
        },
        deserialize,
        (result) => {
            console.log(result);
        }
    ];

    return pipeline(tasks, options);
};

exports.delete = (options) => {
    let tasks = [
        (options) => {
            return _.query(`
                SELECT "UserId", id
                FROM "Notifies"
                WHERE "Notifies".id = ${_.toNumber(options.id)};
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
                DELETE FROM "Notifies"
                WHERE "Notifies".id = ${id};
            `, {
                type: QueryTypes.DELETE
            });
        },
        () => {}
    ];


    return pipeline(tasks, options);
};

exports.post = (object, options) => {
  console.log(options);
  let tasks = [
      (options) => {
          return Notify.create(_.assign(
              {
                  UserId: options.mw.user.id
              },
              _.pick(options, 'SectionId'),
              object
          ), {
        //      include: [ User, CurrentSection ]
          });
      },
      () => ({})
  ];

    return pipeline(tasks, options);
};
