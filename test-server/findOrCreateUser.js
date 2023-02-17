const assert = require("assert");
const { findOrCreateUser } = require("../src/requests");

describe("findOrCreateUser", function () {
  it("should find or create a new contributor in the database", async function () {
    const mary = await findOrCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0cc59907e45614540dAa22Cf62520306439360f2",
      /*contributor_name:*/ "mary",
      /*contributor_signature:*/ "fbd2479a0a10ce2fe8649c413913648271749d9cc61f4d5c7c7b11606b2bb1da",
      /*token:*/ "ghp_1",
    );
    const joseph = await findOrCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*contributor_name:*/ "joseph",
      /*contributor_signature:*/ "c823edc882af63fe6ea40e47a96974c89b14b84563ee73039c84690a15260aa9",
      /*token:*/ "ghp_2",
    );
    const jericho = await findOrCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "none",
      /*contributor_name:*/ "jericho",
      /*contributor_signature:*/ "none",
      /*token:*/ "ghp_123",
    );
        console.log(mary, joseph, jericho)
    assert.equal(mary.contributor_id, "0x0cc59907e45614540dAa22Cf62520306439360f2", "Failed to find or create a user");
    assert.equal(joseph.contributor_id, "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971", "Failed to find or create a user");
    assert.equal(jericho.contributor_name, 'jericho', "Failed to find or create a user");
  });
});
