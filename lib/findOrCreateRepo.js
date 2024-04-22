const { Repo } = require("../server/db");
const algosdk = require("algosdk");
const { Op } = require("sequelize");

async function findOrCreateRepo(
  /*contributor_id*/ contributor_id,
  /*repo_name:*/ repo_name,
  /*contributor_password:*/ signedTxn
) {
	console.log('findOrCreateRepo input:', {
		contributor_id,
		repo_name,
		signedTxn
	});

	   const algodServer = `http://${process.env.ALGOD_SERVER}`;
       const algodPort = process.env.ALGOD_PORT;
       const algodToken = process.env.ALGOD_TOKEN;

	console.log('Algorand client settings:', {
		algodServer,
		algodPort,
		algodToken
	});

       const repoName = repo_name;
       const repoID = contributor_id;

	console.log('namespace/lib/findOrCreateRepo repoID', contributor_id, repoID)

       let newRepoID;

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

	try {
		// Send the signed transaction to the Algorand network
		let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
		let sendResponse = await client.sendRawTransaction(signedTxn).do();

		// Wait for transaction confirmation
		let confirmedTxn = await algosdk.waitForConfirmation(client, sendResponse.txId, 4);

		console.log('Transaction sent:', sendResponse);
		console.log('Transaction confirmed:', confirmedTxn);

		// Get the app ID from the confirmed transaction
		let appId = confirmedTxn["application-index"];

		// Refactor newRepoID so it gets its value from from concactinating
		// '<contributor-id>-<app-id>'
		//
		repoID = `${node_account.addr}-${appId}`;

		console.log('App ID:', appId);
		console.log('Repo ID:', repoID);

		console.log('namespace/lib/findOrCreateRepo newRepoID', newRepoID)
	} catch (error) {
		console.log('Error sending transaction:', error);
	}

	try {
		const [repo, created] = await Repo.findOrCreate({
			where: {
				[Op.or]: [{ repoName: repoName }, { repoID: repoID }],
			},
			defaults: {
				repoName: repoName,
				repoID: repoID,
				repoSignature: "deprecated", // placeholder value as deprecating.
			},
		});
		console.log('namespace/lib/findOrCreateRepo [repo,]', repo)
		console.log('namespace/lib/findOrCreateRepo [, createed]', created)


		// If repo name and id are both supplied but are an incorrect combination return 404
		// because it can't be guaranteed which one the user is trying to get, the repo associated with the name or id
		if (created) {
			// send signed-txn (repoSigned) to algod client
		} else {
                        if (
                            (repoID !== "" && repo.repoID !== repoID) ||
                            (repoName !== "" && repo.repoName !== repoName)
                        ) {
                            response.status = 404;
                            response.message = "could not find a repo with name and id combination supplied";
                            return response;
                        }
		}

		console.log('repo.dataValues.repoID', repo.dataValues.repoID)

		response.status = created ? 201 : 200;
		response.message = created ? "repo created" : "repo found";
		response.repoName = repo.dataValues.repoName;
		response.repoID = repo.dataValues.repoID;
		response.repoSignature = repo.dataValues.repoSignature;
		console.log('turbosrc-namespace /lib/findOrCreateRepo.js response', response)
		return response;
	} catch (error) {
	    console.log('Error finding or creating repo:', error);
		response.status = 500;
		response.message = error?.message;
		response.repoName = "";
		response.repoID = "";
		return response;
	}
}
module.exports = findOrCreateRepo;
