const { Contributor } = require("../server/db")

async function getUserByName(contributor_name) {
  try {
    const user = await Contributor.findOne({
      where: { contributor_name: contributor_name },
    });

    if (!user) {
      // User not found
      return {
        status: "error",
        message: "User not found",
        info: {
          contributor_id: null,
          contributor_name: null
        }
      };
    }

    // User exists
    return {
      status: "success",
      message: "User retrieved successfully",
      info: {
        contributor_id: user.contributor_id,
        contributor_name: user.contributor_name
      }
    };

  } catch (error) {
    // Handle other errors
    return {
      status: "error",
      message: `Error retrieving user: ${error}`,
      info: {
        contributor_id: null,
        contributor_name: null
      }
    };
  }
}

module.exports = getUserByName;
