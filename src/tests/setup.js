const supertest = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");
const mongoose = require("../config/mongodb");

const request = supertest(app);

beforeAll(async () => {
  // Limpa os bancos de dados para testes
  await sequelize.sync({ force: true });
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await sequelize.close();
  await mongoose.connection.close();
});

module.exports = request;
