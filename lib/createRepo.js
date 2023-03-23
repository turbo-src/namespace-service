const { Repo } = require("../server/db");

async function createRepo(
  /*repo_name:*/ repo_name,
  /*repo_id:*/ repo_id,
  /*repo_signature:*/ repo_signature,
  /*contributor_id:*/ contributor_id,
  /*app:*/ app,
  /*repo_uri:*/ repo_uri,
  /*metadata:*/ metadata,
) {
  try {
    await Repo.create({
      repo_name: repo_name,
      repo_id: repo_id,
      repo_signature: repo_signature,
      contributor_id: contributor_id,
      app: app,
      repo_uri: repo_uri,
      metadata: metadata,
    });
    return 201;
  } catch (error) {
    console.log('error', error);
    return `There was an error: ${error}`;
  }
}
module.exports = createRepo;
