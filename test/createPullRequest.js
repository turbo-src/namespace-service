const assert = require("assert");
const { createPullRequest } = require("../lib");

describe("createPullRequest", function () {
  it("create a pull request associated with the repo_id supplied", async function () {
    const res = await createPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*fork_branch:*/ "pullRequest1",
      /*pr_id:*/ "issue_1",
      /*title:*/ "refactor(lsp): remove redundant client cleanup"
    );

    assert.equal(res, "204", "Failed to create a pull request in the database");
  });
});