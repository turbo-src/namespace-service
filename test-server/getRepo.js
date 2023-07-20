const assert = require("assert");
const { getRepo } = require("../src/requests");

describe("getRepo", function () {
	it("should return a repo namespace object", async function () {
		const repoByName = await getRepo("tsrctester1/demo");
		const repoByID = await getRepo(repoByName.repoID);
		const repo404 = await getRepo("hamish/demo");

		assert.equal(
			repoByName.status,
			200,
			"Failed to get a repo's information based on its name"
		);
		assert.equal(
			repoByID.status,
			200,
			"Failed to get a repo's information based on its id"
		);
		assert.equal(
			repo404.status,
			404,
			"Failed to return 404 for an unfound repo"
		);
	});
});
