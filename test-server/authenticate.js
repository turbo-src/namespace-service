const assert = require("assert");
const { postCreateUser, authenticate } = require("../src/requests");

describe("authenticate", function () {
  it("should check if a user's token is the same as in the database", async function () {
    const joan = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0xfbd2479a0a10ce2fe8649c41391b11606b2bb1da",
      /*contributor_name:*/ "joan",
      /*contributor_signature:*/ "fbd2479a648271749d9cc61f4d5c7c7b11606b2bb1da0a10ce2fe13",
      /*token*/ "gho_d9649c413917174c7c7b116c"
    );

    const resAuthenticate = await authenticate(/*contributor_id:*/ "0xfbd2479a0a10ce2fe8649c41391b11606b2bb1da", /*token*/ "gho_d9649c413917174c7c7b116c")
    const resNotAuthenticate = await authenticate(/*contributor_id:*/ "0xfbd2479a0a10ce2fe8649c41391b11606b2bb1da", /*token*/ "gho_d111")
    
    assert.equal(joan, 201, "Failed to create a user");
    assert.equal(resAuthenticate, 200, "Failed validate a user's token");
    assert.equal(resNotAuthenticate, 403, "Failed to invalidate a user's bad token");
  });
});
