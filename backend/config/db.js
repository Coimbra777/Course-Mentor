const config = require("../knexfile.js");
const knex = require("knex")(config);

// função para rodar as migrations diretamente das configurações
knex.migrate.latest([config]);

// knex.client
//   .acquireConnection()
//   .then(() => {
//     console.log("Conexão disponível");
//   })
//   .catch((err) => {
//     console.error("Erro ao adquirir conexão:", err);
//   })
//   .finally(() => {
//     knex
//       .destroy()
//       .then(() => {
//         console.log("Knex connection pool has been closed");
//       })
//       .catch((err) => {
//         console.error("Error closing Knex connection pool:", err);
//       });
//   });

module.exports = knex;
