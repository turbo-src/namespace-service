const { Contributor } = require("../server/db");

async function getUser(contributor_id) {
  let user
  try {
    user = await Contributor.findOne({
      where: {
        contributor_id: contributor_id,
      },
    });

    return {
        status: "success",
        message: "User created successfully",
        info: {
            contributor_id:  user.contributor_id,
            contributor_name: user.contributor_name
        }
    }
  } catch (error) {
    return {
        status: "error",
        message: `Error creating user: ${error}`,
        info: {
            contributor_id:  null,
            contributor_name: null
        }
    }
  }
}
module.exports = getUser;
