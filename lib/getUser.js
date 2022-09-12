const { Contributor } = require("../server/db");

async function getUser(contributor_id) {
  try {
    const user = await Contributor.findOne({
      where: {
        contributor_id: contributor_id,
      },
    });

    return {
      contributor_name: user.contributor_name,
      contributor_id: user.contributor_id,
      contributor_signature: user.contributor_signature,
      token: user.token,
    };
  } catch (error) {
    console.log(error);
    return 500;
  }
}
module.exports = getUser;
