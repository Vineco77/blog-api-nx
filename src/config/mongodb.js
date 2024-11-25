const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Garante que as variáveis de ambiente sejam carregadas
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MONGODB_URI não está definida no arquivo .env");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Conexão com MongoDB estabelecida com sucesso."))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

module.exports = mongoose;
