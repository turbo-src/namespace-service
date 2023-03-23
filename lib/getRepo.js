const { Repo } = require("../server/db");

async function getRepo(repo_id) {
  try {
    const repo = await Repo.findOne({
      where: {
        repo_id: repo_id,
      },
    });

    return {
      repo_name: repo.repo_name,
      repo_id: repo.repo_id,
      repo_signature: repo.repo_signature,
      contributor_id: repo.contributor_id,
      app: repo.app,
      repo_uri: repo.repo_uri,
      metadata: repo.metadata,
    };
  } catch (error) {
    console.log(error);
    return 500;
  }
}
module.exports = getRepo;
