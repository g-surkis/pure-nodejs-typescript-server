
const client = require("knex")({
    client: "pg",
    connection: "postgresql://admin:pass@localhost:5432/main",
    searchPath: ["knex", "public"],
});

module.exports = { knex: client };