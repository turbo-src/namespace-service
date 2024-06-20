const assert = require("assert");
const { getRepo } = require("../src/requests");

describe("getRepo", function () {
  it("should return an object with a repo's repo_name, repo_id, repo_signature, contributor_id, app, repo_uri, and metadata", async function () {
    const repo = await getRepo("joseph/demoRepo");

    assert.equal(
      repo.contributor_id,
      "fbd2479a0a10ce2fe8649c413913648271749d9cc61f4d5c7c7b11606b2bb1da",
      "Failed to get a contributor's information based on their id"
    );
    assert.equal(
      repo.repo_id,
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "Failed to get a contributor's token based on their id"
    );
  });
});
