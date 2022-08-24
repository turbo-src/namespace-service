const { Sequelize } = require("sequelize");

const dbUrl = process.env.DB_URL || "postgres://localhost:5432/namespace-db";

const db = new Sequelize(dbUrl, {
  logging: false,
});

module.exports = db;
