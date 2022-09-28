const { Contributor } = require("../server/db");

async function authenticate(contributor_id, token) {
  try {
    const user = await Contributor.findOne({
      where: {
        contributor_id: contributor_id,
      },
    });
    if(user.token === token){
        return 200
    } else {
        return 403
    }
  } catch (error) {
    console.log(error);
    return 500;
  }
}
module.exports = authenticate;
