const createUser = require("./createUser");
const getContributorID = require("./getContributorID");
const getContributorSignature = require("./getContributorSignature");
const getContributorName = require("./getContributorName");
const getUser = require("./getUser");
const findOrCreateUser = require("./findOrCreateUser");
const createRepo = require("./createRepo");
const getRepo = require("./getRepo");
const setRepo = require("./setRepo");

module.exports = {
  createUser,
  getContributorID,
  getContributorName,
  getContributorSignature,
  getUser,
  findOrCreateUser,
  createRepo,
  getRepo,
  setRepo,
};
