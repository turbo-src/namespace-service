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
  contributor_password: {
    type: Sequelize.STRING(),
    unique: false,
  }
});

module.exports = Contributor;
