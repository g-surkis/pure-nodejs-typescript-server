const { USERS_TABLE } = require("../../constants/db_tables");
const knexLib = require("knex");

exports.up = function (knex: typeof knexLib) {
    return knex.schema
        .createTable(USERS_TABLE, function (table: any) {
            table.increments("id");
            table.string("first_name", 255).notNullable();
            table.string("last_name", 255).notNullable();
            table.string("email", 255).notNullable();
            table.text("thumbnail").nullable();
        });
};

exports.down = function (knex: typeof knexLib) {
    return knex.schema.dropTable(USERS_TABLE);
};
