const { Sequelize } = require('sequelize');

// Create a new Sequelize instance for database connection
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
});

module.exports = sequelize;
