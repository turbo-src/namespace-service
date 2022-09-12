const assert = require("assert");
const { getUser } = require("../src/requests");

describe("getUser", function () {
  it("should return all of a contributor's information in an object with values for: contributor_id, contributor_name, contributor_signature, and token", async function () {
    const user = await getUser("0x0c55D3B26A1229B9D707a4272F55E66103301858");

    assert.equal(
      user.contributor_name,
      "michael",
      "Failed to get a contributor's information based on their id"
    );
    assert.equal(
      user.token,
      "ghp_123",
      "Failed to get a contributor's token based on their id"
    );
  });
});
