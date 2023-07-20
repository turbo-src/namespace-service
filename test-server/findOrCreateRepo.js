const assert = require("assert");
const { findOrCreateRepo } = require("../src/requests");

describe("findOrCreateRepo", function () {
	it("should find or create a new repo in the database", async function () {
		const createRes = await findOrCreateRepo(
			/*repoName:*/ "tsrctester1/demo",
			/*repoId:*/ ""
		);

		const findRes = await findOrCreateRepo(
			/*repoName:*/ "tsrctester1/demo",
			/*repoId:*/ ""
		);

		const findByIDRes = await findOrCreateRepo(
			/*repoName:*/ "",
			/*repoId:*/ findRes.repoID
		);

		const error403 = await findOrCreateRepo(
			/*repoName:*/ "",
			/*repoId:*/ ""
		);

		const error404 = await findOrCreateRepo(
			/*repoName:*/ "tsrctester1/demo",
			/*repoId:*/ "incorrectid1234"
		);

		const error4042 = await findOrCreateRepo(
			/*repoName:*/ "incorrectrepo/name",
			/*repoId:*/ findRes.repoID
		);

		assert.equal(createRes.status, 201, "Failed to create a repo");
		assert.equal(findRes.status, 200, "Failed to find a repo by name");
		assert.equal(findByIDRes.status, 200, "Failed to find a repo by id");
		assert.equal(error403.status, 403, "Failed to trigger an error based on bad arguments");
		assert.equal(error404.status, 404, "Failed to trigger an error based on incorrect combination of repoID and repoName");
		assert.equal(error4042.status, 404, "Failed to trigger an error based on incorrect combination of repoID and repoName");
	});
});
