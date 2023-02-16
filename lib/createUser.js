const { Contributor } = require("../server/db");

async function createUser(
  /*owner:*/ owner,
  /*repo:*/ repo,
  /*contributor_id:*/ contributor_id,
  /*contributor_name:*/ contributor_name,
  /*contributor_signature:*/ contributor_signature,
  /*token:*/ token
) {
  try {
    await Contributor.create({
      contributor_id: contributor_id,
      contributor_name: contributor_name,
      contributor_signature: contributor_signature,
      token: token,
    });
    return 201;
  } catch (error) {
    console.log('error', error);
    return `There was an error: ${error}`;
  }
}
module.exports = createUser;
