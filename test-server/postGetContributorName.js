const assert = require("assert");
const { postGetContributorName } = require("../src/requests");

describe("postGetContributorName", function () {
  it("should return a contributor's name (github login) based on their id (ethereum address)", async function () {
    let contributorName = await postGetContributorName(
      "",
      "",
      "",
      "0x0c55D3B26A1229B9D707a4272F55E66103301858"
    );

    assert.equal(
      contributorName,
      "michael",
      "Failed to get a contributor's name based on their id"
    );
  });
});
