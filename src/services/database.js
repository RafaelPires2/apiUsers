require("dotenv").config();
const Sequelize = require("sequelize");

const env = process.env;

const connection = new Sequelize(
  env.DB_DATABASE,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
  }
);

module.exports = connection;
