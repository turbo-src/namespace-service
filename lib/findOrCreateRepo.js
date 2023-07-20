const { Repo } = require("../server/db");
const Wallet = require("ethereumjs-wallet");
const { Op } = require("sequelize");

async function findOrCreateRepo(
	/*repoID:*/ repoName = "none",
	/*contributorID:*/ repoID = "none"
) {
	const response = {
		status: 200,
		message: "",
		repoName: "",
		repoID: "",
		repoSignature: "",
	};
	if (repoID === "none" && repoName === "none") {
		response.status = 403;
		response.message = "invalid arguments"
		return response;
	}
	if (repoID === "none" || repoSignature === "none") {
		const EthWallet = Wallet.default.generate();
		repoID = EthWallet.getAddressString();
		repoSignature = EthWallet.getPrivateKeyString();
	}

	try {
		const [repo, created] = await Repo.findOrCreate({
			where: {
				[Op.or]: [{ repoName: repoName }, { repoID: repoID }],
			},
			defaults: {
				repoID: repoID,
				repoName: repoName,
				repoSignature: repoSignature,
			},
		});
		response.status = created ? 201 : 200;
		response.message = created ? "repo created" : "repo found";
		response.repoName = repo.repoName;
		response.repoID = repo.repoID;
		response.repoSignature = repo.repoSignature;
		console.log('==>', response)
		return response;
	} catch (error) {
		console.log(error)
		response.status = 500;
		response.message = error?.message;
		response.repoName = "";
		response.repoID = "";
		return response;
	}
}
module.exports = findOrCreateRepo;
