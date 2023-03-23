const assert = require("assert");
const { createRepo } = require("../src/requests");

describe("createRepo", function () {
  it("should create a new repo in the database", async function () {
    const demoRepo = await createRepo(
      /*repo_name:*/ 'demoRepo',
      /*repo_id:*/ 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      /*repo_signature:*/ 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      /*contributor_id:*/ "fbd2479a0a10ce2fe8649c413913648271749d9cc61f4d5c7c7b11606b2bb1da",
      /*app:*/ 'app',
      /*repo_uri:*/ 'repo_uri_2',
      /*metadata:*/ 'metadata',
    );
    const demoRepo2 = await createRepo(
      /*repo_name:*/ 'demoRepo2',
      /*repo_id:*/ '456',
      /*repo_signature:*/ 'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
      /*contributor_id:*/ "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      /*app:*/ 'app2',
      /*repo_uri:*/ 'repo_uri',
      /*metadata:*/ 'metadata2',
    );
    assert.equal(demoRepo, 201, "Failed to create a repo");
    assert.equal(demoRepo2, 201, "Failed to create a repo");
  });
});
