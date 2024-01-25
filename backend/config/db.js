const config = require("../knexfile.js");
const knex = require("knex")(config);

// knex.migrate.latest([config]);
knex.client
  .acquireConnection()
  .then(() => {
    console.log("Conexão disponível");
  })
  .catch((err) => {
    console.error("Erro ao adquirir conexão:", err);
  })
  .finally(() => {
    knex.destroy();
  });

module.exports = knex;
