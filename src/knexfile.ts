
interface KnexConfig {
  [key: string]: object;
}


const config: KnexConfig = {
  development: {
    client: "postgresql",
    connection: {
      database: "main",
      user: "admin",
      password: "pass"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
    }
  }
};


module.exports = config;