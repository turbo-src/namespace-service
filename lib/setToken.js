const { Contributor } = require("../server/db");

async function setUser(contributor_id, token) {
  try {
        await Contributor.update({
        token: token,
        }, {
        where: {
        contributor_id: contributor_id,
        },
    });
    return 201
  } catch (error) {
    console.log(error);
    return 500;
  }
}
module.exports = setUser;
