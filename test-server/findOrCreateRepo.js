const assert = require("assert");
const { findOrCreateRepo } = require("../src/requests");

describe("findOrCreateRepo", function () {
	it("should find or create a new repo in the database", async function () {
		const createRes = await findOrCreateRepo(
			/*repoName:*/ "tsrctester1/demo",
			/*repoId:*/ "none"
		);

		const findRes = await findOrCreateRepo(
			/*repoName:*/ "tsrctester1/demo",
			/*repoId:*/ "none"
		);

		const findByIDRes = await findOrCreateRepo(
			/*repoName:*/ "none",
			/*repoId:*/ findRes.repoID
		);

		const error = await findOrCreateRepo(
			/*repoName:*/ "",
			/*repoId:*/ ""
		);

		assert.equal(createRes.status, 201, "Failed to create a repo");
		assert.equal(findRes.status, 200, "Failed to find a repo by name");
		assert.equal(findByIDRes.status, 200, "Failed to find a repo by id");
		assert.equal(error.status, 403, "Failed to trigger an error based on bad arguments");
	});
});
