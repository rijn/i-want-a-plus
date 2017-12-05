const Promise = require('bluebird');

var models = require('./models');

var Spinner = require('clui').Spinner;

if (process.env.NODE_ENV !== 'dev') {
    let config = models.config;
    console.log(`Connecting [${config.database}]:[${config.host}] via [${config.dialect}] with [${config.username}]`);
}

Promise.resolve().then(() => {
    return require('@justinc/yesno')({ message: 'confirm?' });
}).then((answer) => {
    if (!answer.yes) throw new Error('canceled');
}).delay(500).then(() => {
    Spinner = new Spinner('Authenticating...  ');
    Spinner.start();
    return models.sequelize.authenticate();
}).delay(500).then(() => {
    Spinner.message('Syncing...       ');
    return models.sequelize.sync({ force: true, logging: false });
}).delay(500).then(() => {
    Spinner.message('Creating default data...');
    return Promise.all([
        models.School.create({ name: 'UIUC' }),
        models.Group.create({ name: 'default' }),
        models.Group.create({ name: 'admin' }),
        models.Permission.create({ name: 'view_profile', GroupId: 1 }, {
            include: [{ model: models.Group }]
        }),
        models.Permission.create({ name: 'upload_csv', GroupId: 2 }, {
            include: [{ model: models.Group }]
        })
    ]);
}).delay(500).then(() => {
    return models.sequelize.query(`
        CREATE OR REPLACE FUNCTION avg_comment_rating()
        RETURNS TRIGGER
        AS
        $avg_comment$
        BEGIN
            UPDATE "Courses"
            SET "averageRating" = "Sub"."avgRating"
            FROM (
                SELECT "Courses"."id" AS "sId", AVG("Comments"."rating") AS "avgRating"
                FROM "Courses", "Comments"
                WHERE
                    "Courses"."id" = NEW."CourseId"
                    AND "Courses"."id" = "Comments"."CourseId"
                GROUP BY "Courses"."id"
            ) AS "Sub"
            WHERE "Courses"."id" = "Sub"."sId";
            RETURN NEW;
        END;
        $avg_comment$ LANGUAGE plpgsql;

        CREATE TRIGGER updateAvgRating
            AFTER INSERT OR UPDATE ON "Comments" FOR EACH ROW EXECUTE PROCEDURE avg_comment_rating();
    `);
}).delay(500).then(() => {
    return models.sequelize.query(`
        CREATE VIEW Best_CommentRating
        AS
        SELECT "id", "subject", "course", "title", "averageRating"
        FROM "Courses" AS "c1"
        WHERE "c1"."averageRating" = (
            SELECT MAX("averageRating")
            FROM "Courses"
            WHERE "c1"."subject" = "subject"
        ) AND "c1"."averageRating" > 0;
    `);
}).done(() => {
    Spinner.stop();
    models.sequelize.close();
    console.log('sync finished.');
});
