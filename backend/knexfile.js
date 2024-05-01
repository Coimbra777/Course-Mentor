module.exports = {
  client: "postgresql",
  connection: {
    host: "database",
    port: "5432",
    database: "speed_drive",
    user: "postgres",
    password: "123456",
  },
  pool: {
    min: 2,
    max: 20,
  },
  acquireConnectionTimeout: 60000,
  migrations: {
    tableName: "knex_migrations",
  },
};
