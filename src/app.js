const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("./config/mongodb");
const sequelize = require("./config/database");

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

// Prefixo da API
const API_PREFIX = process.env.API_PREFIX || "/api/v1";

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(API_PREFIX, postRoutes);

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

// Sincroniza os modelos com o banco de dados
sequelize
  .sync({ alter: process.env.NODE_ENV === "development" })
  .then(() => {
    console.log("Modelos sincronizados com o PostgreSQL");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar modelos:", err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
