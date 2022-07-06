import assert from "assert";
import createRepo from "../lib/createRepo.js";
import getRepoTokenAmount from "../lib/getRepoTokenAmount.js";

describe("getTokenAmount", function () {
  it("should return the amount of tokens belonging to a repo", async function () {
    await createRepo(
      /*owner:*/ "john",
      /*repo:*/ "john/demo",
      /*pr_id:*/ "",
      /*contributor:*/ "222",
      /*side:*/ ""
    );

    let tokenAmount = await getRepoTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "john/demo",
      /*pr_id:*/ "",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    assert.equal(tokenAmount, 1_000_000, "Failed to get repo token amount");
  });
});
