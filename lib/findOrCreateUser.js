const { Contributor } = require("../server/db");
const Wallet = require('ethereumjs-wallet');

async function findOrCreateUser(
  /*owner:*/ owner,
  /*repo:*/ repo,
  /*contributor_id:*/ contributor_id,
  /*contributor_name:*/ contributor_name,
  /*contributor_signature:*/ contributor_signature,
  /*token:*/ token
) {
  if (contributor_id === 'none' || contributor_signature === 'none') {
    const EthWallet = Wallet.default.generate();
    contributor_id = EthWallet.getAddressString();
    contributor_signature = EthWallet.getPrivateKeyString();
  }
  
  try {
    const [contributor, created] = await Contributor.findOrCreate({
      where: { contributor_name: contributor_name },
      defaults: {
        contributor_id: contributor_id,
        contributor_name: contributor_name,
        contributor_signature: contributor_signature,
        token: token,
      }
    });

    // If an existing contributor is found, but the provided contributor_id or
    // contributor_signature are different, then update the contributor.
    if (!created && (contributor.contributor_id !== contributor_id || contributor.contributor_signature !== contributor_signature)) {
      contributor.contributor_id = contributor_id;
      contributor.contributor_signature = contributor_signature;
      await contributor.save();
    }

    const response = {
      contributor_name: contributor.contributor_name,
      contributor_id: contributor.contributor_id,
      contributor_signature: contributor.contributor_signature,
      token: contributor.token,
    };

    console.log('response', response);
    return response;
  } catch (error) {
    console.log('error', error);
    return `There was an error: ${error}`;
  }
}

module.exports = findOrCreateUser;
