const assert = require("assert");
const { postGetContributorName } = require("../src/requests");

describe("postGetContributorName", function () {
  it("should return a contributor's name (github login) based on their (ethereum address) ", async function () {
    const mary = await postGetContributorName(
      "",
      "",
      "",
      "0x0cc59907e45614540dAa22Cf62520306439360f2"
    );
    const joseph = await postGetContributorName(
      "",
      "",
      "",
      "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971"
    );
    const gabriel = await postGetContributorName(
      "",
      "",
      "",
      "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983"
    );
    const michael = await postGetContributorName(
      "",
      "",
      "",
      "0x0c55D3B26A1229B9D707a4272F55E66103301858"
    );
    const magda = await postGetContributorName(
      "",
      "",
      "",
      "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925"
    );
    const thomas = await postGetContributorName(
      "",
      "",
      "",
      "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53"
    );
    const ben = await postGetContributorName(
      "",
      "",
      "",
      "0x0ceeed31E39a896CB5f69f1a05c013a7840A5f78"
    );
    const louis = await postGetContributorName(
      "",
      "",
      "",
      "0x0cea312808EdcdC905428D3922480930689F4500"
    );
    const thibaut = await postGetContributorName(
      "",
      "",
      "",
      "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164"
    );
    const ignacius = await postGetContributorName(
      "",
      "",
      "",
      "0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C"
    );
    assert.equal(mary, "mary", "Failed to get a user name");
    assert.equal(joseph, "joseph", "Failed to get a user name");
    assert.equal(gabriel, "gabriel", "Failed to get a user name");
    assert.equal(michael, "michael", "Failed to get a user name");
    assert.equal(magda, "magda", "Failed to get a user name");
    assert.equal(thomas, "thomas", "Failed to get a user name");
    assert.equal(ben, "ben", "Failed to get a user name");
    assert.equal(louis, "louis", "Failed to get a user name");
    assert.equal(thibaut, "thibaut", "Failed to get a user name");
    assert.equal(ignacius, "ignacius", "Failed to get a user name");
  });
});
