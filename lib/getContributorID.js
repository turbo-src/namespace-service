const { Contributor } = require("../server/db");

async function getContributorID(owner, repo, defaultHash, contributor_name) {
  try {
    const contributor = await Contributor.findOne({
      where: { contributor_name: contributor_name },
    });
    if (contributor) {
      return contributor.contributor_id;
    } else {
      return "none";
    }
  } catch (error) {
    return `There was an error: ${error}`;
  }
}

module.exports = getContributorID;
