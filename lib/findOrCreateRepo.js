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

       // AI add a console log of the signedTxn and ascertain its type, too, so you can see what you're dealing with.
       console.log('signedTxn:', signedTxn);
       console.log('Type of signedTxn:', typeof signedTxn);
       // I'm going to want you to add SuggestedParamaters to the signedTxn Paramaters

       const algodServer = process.env.ALGOD_SERVER;
       const algodPort = process.env.ALGOD_PORT;
       const algodToken = process.env.ALGOD_TOKEN;

       console.log('Algorand client settings:', {
         algodServer,
         algodPort,
         algodToken
       });

       const repoName = repo_name;
       var repoID = contributor_id;

	console.log('namespace/lib/findOrCreateRepo repoID', contributor_id, repoID)

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

          // Import node-fetch dynamically
          const { default: fetch } = (await import('node-fetch'));
          global.fetch = fetch;

          // Insert SuggestedParameters into the signed transaction
          console.log('Getting suggested parameters...');
          const suggestedParams = await getSuggestedParams(client);
          console.log('Suggested parameters:', suggestedParams);

          console.log('Decoding signed transaction...');
          const signedTxnBuffer = Buffer.from(signedTxn, 'base64');
          const decodedTxn = algosdk.decodeSignedTransaction(signedTxnBuffer);
          console.log('Decoded transaction:', decodedTxn);

          //console.log('Assigning suggested parameters to decoded transaction...');
          //Object.assign(decodedTxn.txn, suggestedParams);
          //decodedTxn.txn.fee = suggestedParams.minFee; // Assign the minFee value to the fee field
          //delete decodedTxn.txn.note; // Remove the note field from the transaction object
          //delete decodedTxn.txn.lease; // Remove the lease field from the transaction object
          //console.log('Updated decoded transaction:', decodedTxn);

          console.log('Assigning suggested parameters to decoded transaction...');
          decodedTxn.txn.flatFee = suggestedParams.flatFee;
          decodedTxn.txn.fee = suggestedParams.minFee;
          decodedTxn.txn.firstRound = suggestedParams.firstRound;
          decodedTxn.txn.lastRound = suggestedParams.lastRound;
          decodedTxn.txn.genesisID = suggestedParams.genesisID;
          decodedTxn.txn.genesisHash = suggestedParams.genesisHash;
          delete decodedTxn.txn.note; // Remove the note field from the transaction object
          delete decodedTxn.txn.lease; // Remove the lease field from the transaction object
          decodedTxn.txn.appComplete = 0;

          console.log('Encoding updated signed transaction...');
          const updatedTxnBytes = algosdk.encodeObj(decodedTxn.txn);
          const updatedSignedTxn = Buffer.concat([updatedTxnBytes, decodedTxn.sig]);
          console.log('Encoded signed transaction:', updatedSignedTxn);

          console.log('Sending raw transaction...');
          const txBytes = new Uint8Array(updatedSignedTxn);
	  //const txBytes = Buffer.from(signedTxn, 'base64');
          let sendResponse;
          try {
            sendResponse = await client.sendRawTransaction(txBytes).do();
            console.log('Transaction sent!', sendResponse);
          } catch (error) {
            console.error('Failed to send transaction:', error);
            throw error;
          }

          let confirmedTxn = await algosdk.waitForConfirmation(client, sendResponse.txId, 4);
          console.log('Transaction confirmed:', confirmedTxn);

          // Get the app ID from the confirmed transaction
          let appId = confirmedTxn["application-index"];
          console.log('App ID:', appId);

          // Append the app ID to the repoID
          repoID = `${repoID}-${appId}`;
          console.log('Repo ID:', repoID);

          console.log('namespace/lib/findOrCreateRepo newRepoID', repoID);
        } catch (error) {
          console.log('Error sending transaction:', error);
          throw error;
        }

	try {
		console.log('turbosrc-namespace/lib/findOrCreateRepo concact repoID', repoID)

                //const signedTxnString = txnBytes.toString('utf-8');
                //console.log('Decoded transaction string:', signedTxnString);

		// For converting back as it's stored to string now in the database below.
                //const txnBytesFromString = Buffer.from(txnString, 'utf-8');
                //const base64_txn_again = txnBytesFromString.toString('base64');
                //console.log('Re-encoded base64 transaction:', base64_txn_again);

		const [repo, created] = await Repo.findOrCreate({
			where: {
				[Op.or]: [{ repoName: repoName }, { repoID: repoID }],
			},
			defaults: {
				repoName: repoName,
				repoID: repoID,
				// repoSignature: "deprecated", // placeholder value as deprecating.
				repoSignature: "placeholder" //signedTxn, // Use the signed transaction as the contributor password/authorization (too long for db)
			},
		});
		console.log('namespace/lib/findOrCreateRepo [repo,]', repo)
		console.log('namespace/lib/findOrCreateRepo [, created]', created)


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

async function getSuggestedParams(algodClient) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout in 5000 milliseconds, or 5 seconds

    const params = await algodClient.getTransactionParams().do({ signal: controller.signal });
    clearTimeout(timeoutId);
    return params;
  } catch (error) {
    console.error("Error fetching transaction parameters:", error);
    throw error;
  }
}

module.exports = findOrCreateRepo;
