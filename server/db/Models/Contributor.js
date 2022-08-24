const { Sequelize } = require("sequelize");
const db = require("../db");

const Contributor = db.define("contributor", {
  contributor_name: {
    type: Sequelize.STRING(),
    isUnique: true,
  },
  contributor_id: {
    type: Sequelize.STRING(),
    isUnique: true,
  },
  contributor_signature: {
    type: Sequelize.STRING(),
    isUnique: true,
  },
});

module.exports = Contributor;
