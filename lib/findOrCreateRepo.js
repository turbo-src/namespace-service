const { Repo } = require("../server/db");
const Wallet = require("ethereumjs-wallet");
const { Op } = require("sequelize");

async function findOrCreateRepo(
	/*repoName:*/ repoName,
	/*repoID:*/ repoID = ""
) {
	let newRepoID;
	let repoSignature;

	const response = {
		status: 200,
		message: "",
		repoName: "",
		repoID: "",
		repoSignature: "",
	};

	if (repoID === "" && repoName === "") {
		response.status = 403;
		response.message = "invalid arguments";
		return response;
	}

	if (repoID === "") {
		const EthWallet = Wallet.default.generate();
		newRepoID = EthWallet.getAddressString();
		repoSignature = EthWallet.getPrivateKeyString();
	}

	try {
		const [repo, created] = await Repo.findOrCreate({
			where: {
				[Op.or]: [{ repoName: repoName }, { repoID: repoID }],
			},
			defaults: {
				repoName: repoName,
				repoID: newRepoID,
				repoSignature: repoSignature,
			},
		});

		// If repo name and id are both supplied but are an incorrect combination return 404
		// because it can't be guaranteed which one the user is trying to get, the repo associated with the name or id
		if (!created) {
			if (
				(repoID !== "" && repo.repoID !== repoID) ||
				(repoName !== "" && repo.repoName !== repoName)
			) {
				response.status = 404;
				response.message =
					"could not find a repo with name and id combination supplied";
				return response;
			}
		}

		response.status = created ? 201 : 200;
		response.message = created ? "repo created" : "repo found";
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
module.exports = findOrCreateRepo;
