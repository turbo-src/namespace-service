const { Contributor } = require("../server/db");

async function createUser(
  /*contributor_id:*/ contributor_id,
  /*contributor_name:*/ contributor_name,
  /*contributor_password:*/ contributor_password,
) {
  try {
    await Contributor.create({
      contributor_id: contributor_id,
      contributor_name: contributor_name,
      contributor_password: contributor_password,
    });
    return {
        status: "success",
        message: "User created successfully",
        info: {
            contributor_id:  contributor_id,
            contributor_name: contributor_name
        }
    };
  } catch (error) {
    // Check if the error is SequelizeUniqueConstraintError and specific error message exists
    if (error.name === 'SequelizeUniqueConstraintError') {
      const isContributorNameError = error.errors.some(e => e.path === 'contributor_name' && e.message === 'contributor_name must be unique');

      if (isContributorNameError) {
        return {
          status: "error",
          message: `User '${contributor_name}' already exists`, // Custom message for unique constraint error
          info: {
              contributor_id:  contributor_id,
              contributor_name: contributor_name
          }
        };
      }
    } else {
      return {
        status: "error",
        message: `Error creating user: ${error.message}`, // General error message
        info: {
            contributor_id:  contributor_id,
            contributor_name: contributor_name
        }
      };
    }
  }
}
module.exports = createUser;
