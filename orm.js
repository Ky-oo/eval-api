const Sequelize = require("sequelize");

// Create instance of sequelize with environements variables
const sequelizeInstance = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: "mysql" }
);

module.exports = sequelizeInstance;
