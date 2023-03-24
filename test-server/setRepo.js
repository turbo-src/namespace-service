const assert = require("assert");
const { setRepo } = require("../src/requests");

describe("setRepo", function () {
  it("should update repo's repo_name, repo_id, repo_signature, contributor_id, app, repo_uri, and metadata", async function () {
    const repo = await setRepo("joseph/demoRepo", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", "fbd2479a0a10ce2fe8649c413913648271749d9cc61f4d5c7c7b11606b2bb1da","app_updated","repo_uri_updated","metadata_updated");
    // const repoNotFound = await setRepo( "jacob/demo111", "", "", "fbd2479a0a10ce2fe8649c413913648271749d9cc61f4d5c7c7b11606b2bb1da", "app_updated", "repo_uri_updated", "metadata_updated");

    assert.equal(
      repo,
      200,
      "Failed to update a repo"
    );
    // assert.equal(
    //   repoNotFound,
    //   404,
    //   "Failed to return 404 for an unfound repo"
    // );
  });
});
