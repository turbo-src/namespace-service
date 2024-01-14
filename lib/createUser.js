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
    return {
        status: "success",
        message: "User created successfully",
        info: {
            contributor_id:  contributor_id,
            contributor_name: contributor_name
        }
    }
  } catch (error) {
    return {
        status: "error",
        message: `Error creating user: ${error}`,
        info: {
            contributor_id:  contributor_id,
            contributor_name: contributor_name
        }
    }
  }
}
module.exports = createUser;
