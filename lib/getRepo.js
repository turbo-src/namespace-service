const { Repo } = require("../server/db");
const { Op } = require("sequelize");

async function getRepo(/*repoNameOrID:*/ repoNameOrID) {
	const response = {
		status: 200,
		message: "",
		repoName: "",
		repoID: "",
		repoSignature: "",
	};

	try {
		const repo = await Repo.findOne({
			where: {
				[Op.or]: [{ repoName: repoNameOrID }, { repoID: repoNameOrID }],
			},
		});

		if (!repo) {
			response.status = 404;
			response.message = "repo not found";
			return response;
		}

		response.status = 200;
		response.message = "repo found";
		response.repoName = repo.repoName;
		response.repoID = repo.repoID;
		response.repoSignature = repo.repoSignature;
		return response;
	} catch (error) {
		console.log(error);
		response.status = 500;
		response.message = error?.message;
		response.repoName = "";
		response.repoID = "";
		return response;
	}
}
module.exports = getRepo;
