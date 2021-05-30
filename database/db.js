const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "mysql",
  storage: "challenge.db",
  
});

module.exports = db;