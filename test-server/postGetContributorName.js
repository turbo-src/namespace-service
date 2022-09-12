const assert = require("assert");
const { postGetContributorName } = require("../src/requests");

describe("postGetContributorName", function () {
  it("should return a contributor's name (github login) based on their (ethereum address) ", async function () {
    let name = await postGetContributorName(
      "",
      "",
      "",
      "0x0c55D3B26A1229B9D707a4272F55E66103301858"
    );

    assert.equal(
      name,
      "michael",
      "Failed to get a contributor's id based on their name"
    );
  });
});
