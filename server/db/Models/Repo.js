const { Sequelize } = require("sequelize");
const db = require("../db");

const Repo = db.define("repo", {
  repo_name: {
    type: Sequelize.STRING(),
    unique: true,
  },
  repo_id: {
    type: Sequelize.STRING(),
    unique: true,
  },
  contributor_id: {
    type: Sequelize.STRING(),
  },
  repo_signature: {
    type: Sequelize.STRING(),
    unique: true,
  },
  app: {
    type: Sequelize.STRING(),
    defaultValue: "TBD",
  },
  metadata: {
    type: Sequelize.STRING(),
    defaultValue: "TBD",
  },
});

module.exports = repo;
