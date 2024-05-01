const bcrypt = require("bcrypt-nodejs");

exports.seed = function (knex) {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
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
