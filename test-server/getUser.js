const assert = require("assert");
const { getUser } = require("../src/requests");

describe("getUser", function () {
  it("should return all of a contributor's information in an object with values for: contributor_id, contributor_name, contributor_signature, and token", async function () {
    assert.deepEqual(
      await getUser(
        /*contributor_id:*/ '0x0c55D3B26A1229B9D707a4272F55E66103301858'
      ),
      {
        status: "success",
        message: "User retrieved successfully",
        info: {
          contributor_id: "0x0c55D3B26A1229B9D707a4272F55E66103301858",
          contributor_name: "michael"
        }
      }
     )
    });
  it("should say a contributor could not be found", async function () {
    assert.deepEqual(
      await getUser(
        /*contributor_id:*/ '0x0000000000000000000000000000000000000000'
      ),
      {
        status: "error",
        message: "User not found",
        info: {
          contributor_id: null,
          contributor_name: null
        }
      }
     )
    });

});
