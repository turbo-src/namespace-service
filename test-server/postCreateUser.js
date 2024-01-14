const assert = require("assert");
const { postCreateUser } = require("../src/requests");

describe("postCreateUser", function () {
  it("should create a new contributor in the database", async function () {
    const mary = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0cc59907e45614540dAa22Cf62520306439360f2",
      /*contributor_name:*/ "mary",
      /*contributor_signature:*/ "fbd2479a0a10ce2fe8649c413913648271749d9cc61f4d5c7c7b11606b2bb1da",
      /*token:*/ "ghp_1",
    );
    const joseph = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*contributor_name:*/ "joseph",
      /*contributor_signature:*/ "c823edc882af63fe6ea40e47a96974c89b14b84563ee73039c84690a15260aa9",
      /*token:*/ "ghp_2",
    );
    const gabriel = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*contributor_name:*/ "gabriel",
      /*contributor_signature:*/ "aafb277192d17af46f1a70159d8030044608bce42240cc2f9e56c76c7cbf042d",
      /*token:*/ "ghp_3",
    );
    const michael = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*contributor_name:*/ "michael",
      /*contributor_signature:*/ "968c746475645747da5dfdf939a7b34f4316e52f2a6c383a3c1076d157b15377",
      /*token:*/ "ghp_4",
    );
    const magda = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*contributor_name:*/ "magda",
      /*contributor_signature:*/ "eefe0069e3ab159d52fc43e5c7bf6d294fcc7604071bae3ca5e1fe7cc86a46eb",
      /*token:*/ "ghp_5",
    );
    const thomas = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53",
      /*contributor_name:*/ "thomas",
      /*contributor_signature:*/ "e5cf9c67168d26569cf1eda4e45d1153dae8ebe1bfb31090340c25f509f698a1",
      /*token:*/ "ghp_6",
    );
    const ben = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0ceeed31E39a896CB5f69f1a05c013a7840A5f78",
      /*contributor_name:*/ "ben",
      /*contributor_signature:*/ "c02f8d57a6e9bee718ebf12c2fb1540946e8c413e9bc8d5d5dbebb722aead67a",
      /*token:*/ "ghp_7",
    );
    const louis = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0cea312808EdcdC905428D3922480930689F4500",
      /*contributor_name:*/ "louis",
      /*contributor_signature:*/ "036868adf396b707f56ba153296e93a91a217a2cdd8f23d96c659277d0c29dae",
      /*token:*/ "ghp_8",
    );
    const thibaut = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164",
      /*contributor_name:*/ "thibaut",
      /*contributor_signature:*/ "1c5f1599e10067a5ce42e31bedd22fcbdaa626d8aa395d9753c8700f57152b95",
      /*token:*/ "ghp_9",
    );
    const ignacius = await postCreateUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C",
      /*contributor_name:*/ "ignacius",
      /*contributor_signature:*/ "ec9a715c2ac1e570cc214b5f8d23bd7102affb5372dfcabd8ecd206c907e03f2",
      /*token:*/ "ghp_10",
    );

    assert.deepEqual(
      mary,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0cc59907e45614540dAa22Cf62520306439360f2",
          contributor_name: "mary"
        }
      }
    )

    assert.deepEqual(
      joseph,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
          contributor_name: "joseph"
        }
      }
    )

    assert.deepEqual(
      gabriel,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
          contributor_name: "gabriel"
        }
      }
    )

    assert.deepEqual(
      michael,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0c55D3B26A1229B9D707a4272F55E66103301858",
          contributor_name: "michael"
        }
      }
    )

    assert.deepEqual(
      magda,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
          contributor_name: "magda"
        }
      }
    )

    assert.deepEqual(
      thomas,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53",
          contributor_name: "thomas"
        }
      }
    )

    assert.deepEqual(
      ben,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0ceeed31E39a896CB5f69f1a05c013a7840A5f78",
          contributor_name: "ben"
        }
      }
    )

    assert.deepEqual(
      louis,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0cea312808EdcdC905428D3922480930689F4500",
          contributor_name: "louis"
        }
      }
    )

    assert.deepEqual(
      thibaut,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164",
          contributor_name: "thibaut"
        }
      }
    )

    assert.deepEqual(
      ignacius,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C",
          contributor_name: "ignacius"
        }
      }
    )

    assert.deepEqual(
      ignacius,
      {
        status: "success",
        message: "User created successfully",
        info: {
          contributor_id: "0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C",
          contributor_name: "ignacius"
        }
      }
    )
  });
  it("should not be able recreate an existing contributor in the database", async function () {
    assert.deepEqual(
      await postCreateUser(
        /*owner:*/ "",
        /*repo:*/ "",
        /*contributor_id:*/ "0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C",
        /*contributor_name:*/ "ignacius",
        /*contributor_signature:*/ "ec9a715c2ac1e570cc214b5f8d23bd7102affb5372dfcabd8ecd206c907e03f2",
        /*token:*/ "ghp_10",
      ),
      {
        status: 'error',
        message: 'Error creating user: SequelizeUniqueConstraintError: Validation error',
        info: {
          contributor_id: '0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C',
          contributor_name: 'ignacius'
        }
      }
    )
  });
});
