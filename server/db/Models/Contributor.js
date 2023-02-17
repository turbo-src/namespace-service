const { Sequelize } = require("sequelize");
const db = require("../db");

const Contributor = db.define("contributor", {
  contributor_name: {
    type: Sequelize.STRING(),
    unique: true,
  },
  contributor_id: {
    type: Sequelize.STRING(),
    unique: true,
  },
  contributor_signature: {
    type: Sequelize.STRING(),
    unique: true,
  },
  token: {
    type: Sequelize.STRING(),
    defaultValue: "ghp_123",
  },
});

module.exports = Contributor;
