const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexão com MongoDB estabelecida com sucesso."))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

module.exports = mongoose;
