const bcrypt = require("bcrypt-nodejs");

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNull();
      table.string("email").notNull().unique();
      table.string("password").notNull();
      table.boolean("admin").notNull().defaultTo(false);
    })
    .then(() => {
      return knex("users").insert([
        {
          name: "admin",
          email: "admin@admin.com.br",
          password: encryptPassword("123456"),
          admin: true,
        },
      ]);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
