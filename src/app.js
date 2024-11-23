const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota básica para teste
app.get("/", (req, res) => {
  res.json({ message: "API Blog - Desafio Técnico" });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Erro interno no servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
