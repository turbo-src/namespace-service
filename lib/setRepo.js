const { Repo } = require("../server/db");

async function setRepo(repo_name, repo_id, repo_signature, contributor_id, app, repo_uri, metadata) {
  try {
    const repo = await Repo.update({
        repo_name: repo_name,
        repo_id: repo_id,
        repo_signature: repo_signature,
        contributor_id: contributor_id,
        app: app,
        repo_uri: repo_uri,
        metadata: metadata},
      {
      where: {
        repo_name: repo_name,
      },
    });
    return 200
  } catch (error) {
    return 500;
  }
}
module.exports = setRepo;
