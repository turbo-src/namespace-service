const { Contributor } = require("../server/db");
async function getContributorName(owner, repo, pr_id, contributor_id) {
  try {
    const contributor = await Contributor.findOne({
      where: { contributor_id: contributor_id },
    });
    return contributor.contributor_name;
  } catch (error) {
    console.log(error);
    return `There was an error: ${error}`;
  }
}

module.exports = getContributorName;
