const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mentor_stats").catch((e) => {
  const msg = "ERRO, Não foi possível conectar com o mongodb";
  console.error(msg, e);
});
