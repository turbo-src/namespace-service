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
    console.error("Error in createUser:", error); // Log the error

    if (error.name === 'SequelizeUniqueConstraintError') {
      const isContributorNameError = error.errors.some(e => e.path === 'contributor_name' && e.message === 'contributor_name must be unique');
      const isContributorIdError = error.errors.some(e => e.path === 'contributor_id' && e.message === 'contributor_id must be unique');

      if (isContributorNameError) {
        return {
          status: "error",
          message: `User '${contributor_name}' already exists`, // Custom message for unique constraint error on name
          info: {
              contributor_id:  contributor_id,
              contributor_name: contributor_name
          }
        };
      } else if (isContributorIdError) {
        return {
          status: "error",
          message: `Contributor ID '${contributor_id}' already exists`, // Custom message for unique constraint error on ID
          info: {
              contributor_id:  contributor_id,
              contributor_name: contributor_name
          }
        };
      }
    }

    // Fallback for other types of errors
    return {
      status: "error",
      message: `Error creating user: ${error.message}`,
      info: {
          contributor_id:  contributor_id,
          contributor_name: contributor_name
      }
    }
  };
}

module.exports = createUser;
