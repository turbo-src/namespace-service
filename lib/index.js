const createUser = require("./createUser");
const getContributorID = require("./getContributorID");
const getContributorSignature = require("./getContributorSignature");
const getContributorName = require("./getContributorName");
const getUser = require("./getUser");
const getUserByName = require("./getUserByName");
const findOrCreateUser = require("./findOrCreateUser");
const findOrCreateRepo = require("./findOrCreateRepo");
const getRepo = require("./getRepo");

module.exports = {
  createUser,
  getContributorID,
  getContributorName,
  getContributorSignature,
  getUser,
  getUserByName,
  findOrCreateUser,
  findOrCreateRepo,
  getRepo
};
