const { Contributor } = require("../server/db");
const Wallet = require('ethereumjs-wallet');


async function createUser(
  /*owner:*/ owner,
  /*repo:*/ repo,
  /*contributor_id:*/ contributor_id,
  /*contributor_name:*/ contributor_name,
  /*contributor_signature:*/ contributor_signature,
  /*token:*/ token
) {
  if(contributor_id === 'none' || contributor_signature === 'none'){
    const EthWallet = Wallet.default.generate();
    contributor_id = EthWallet.getAddressString()
    contributor_signature = EthWallet.getPrivateKeyString()
  }
  try {
   const contributor = await Contributor.findOne({where:{contributor_name: contributor_name}})
    if(contributor){
    console.log('user already exists:', contributor_name)
    return 403
    }
    await Contributor.create({
      contributor_id: contributor_id,
      contributor_name: contributor_name,
      contributor_signature: contributor_signature,
      token: token,
    });
    console.log('user created', contributor_id, contributor_name, contributor_signature, token);
    return 201;
  } catch (error) {
    console.log('error', error);
    return `There was an error: ${error}`;
  }
}
module.exports = createUser;
