module.exports = {
  client: "postgresql",
  connection: {
    database: "speed_drive",
    user: "postgres",
    password: "123456",
  },
  pool: {
    min: 2,
    max: 10,
  },
  acquireConnectionTimeout: 60000,
  migrations: {
    tableName: "knex_migrations",
  },
};
