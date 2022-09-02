const { Contributor } = require("../server/db");
async function getContributorName(owner, repo, pr_id, contributor_id) {
  try {
    const contributor = await Contributor.findOne({
      where: { contributor_id: contributor_id },
    });
    if (contributor) {
      return contributor.contributor_name;
    } else {
      return "none";
    }
  } catch (error) {
    return `There was an error: ${error}`;
  }
}

module.exports = getContributorName;
