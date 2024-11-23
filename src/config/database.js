const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com PostgreSQL estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao PostgreSQL:", error);
  }
};

testConnection();

module.exports = sequelize;
