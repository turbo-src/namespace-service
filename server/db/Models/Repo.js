const { Sequelize } = require("sequelize");
const db = require("../db");

const Repo = db.define("repo", {
  repoName: {
    type: Sequelize.STRING(),
    unique: true,
  },
  repoID: {
    type: Sequelize.STRING(),
    unique: true,
  },
  repoSignature: {
    type: Sequelize.STRING(),
    unique: true,
  },
});

module.exports = Repo;
