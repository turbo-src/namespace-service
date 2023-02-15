const assert = require("assert");
const { setToken, getUser } = require("../src/requests");

describe("setToken", function () {
  it("should update a user's token", async function () {
    const setTokenRes = await setToken("0x0c55D3B26A1229B9D707a4272F55E66103301858", "ghp_111");
    const user = await getUser("0x0c55D3B26A1229B9D707a4272F55E66103301858")

    assert.equal(
      setTokenRes,
      201,
      "Failed to update a user's token based on their id"
    );
    assert.equal(
      user.token,
      "ghp_111",
      "Failed to update a user's token based on their id"
    );
  });
});
