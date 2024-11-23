const mongoose = require("mongoose");
const { sequelize } = require("../config/database");
const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

// Configuração do ambiente de teste
beforeAll(async () => {
  // Conecta aos bancos de dados de teste
  await mongoose.connect(
    process.env.MONGODB_URI_TEST || "mongodb://localhost:27017/blog_api_test"
  );
  await sequelize.authenticate();

  // Sincroniza os modelos do Sequelize (força recriação das tabelas)
  await sequelize.sync({ force: true });
});

// Limpa os bancos após cada teste
afterEach(async () => {
  await mongoose.connection.dropDatabase();
  await sequelize.sync({ force: true });
});

// Fecha as conexões após todos os testes
afterAll(async () => {
  await mongoose.connection.close();
  await sequelize.close();
});

module.exports = { request };
