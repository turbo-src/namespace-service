const assert = require("assert");
const { postGetContributorToken } = require("../src/requests");

describe("postGetContributorToken", function () {
  it("should return a contributor's github token based on their contributor_id", async function () {
    let token1 = await postGetContributorToken(
      "0x0cc59907e45614540dAa22Cf62520306439360f2"
    );
    let token2 = await postGetContributorToken(
        "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971"
      );

    assert.equal(
      token1,
      "ghp_1",
      "Failed to get a contributor's github token based on contributor_id"
    );

    assert.equal(
        token2,
        "ghp_2",
        "Failed to get a contributor's github token based on contributor_id"
      );
  });
});
