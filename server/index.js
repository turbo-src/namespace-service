const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { db } = require("./db");
require("dotenv").config();

const {
  createUser,
  getContributorID,
  getContributorSignature,
  getContributorName,
  getUser,
  setToken
} = require("../lib");

var schema = buildSchema(`
type User {
  contributor_name: String!,
  contributor_id: String!,
  contributor_signature: String!,
  token: String!,
}
  type Query {
    createUser(owner: String, repo: String, contributor_id: String, contributor_name: String, contributor_signature: String, token: String): String,
    getContributorName(owner: String, repo: String, defaultHash: String, contributor_id: String): String,
    getContributorID(owner: String, repo: String, defaultHash: String, contributor_name: String): String,
    getContributorSignature(owner: String, repo: String, defaultHash: String, contributor_id: String): String,
    getUser(contributor_id: String): User,
    setToken(contributor_id: String, token: String): String,
  }
`);

var root = {
  createUser: async (args) => {
    const res = await createUser(
      args.owner,
      args.repo,
      args.contributor_id,
      args.contributor_name,
      args.contributor_signature,
      args.token
    );
    return res;
  },
  getContributorName: async (args) => {
    const res = await getContributorName(
      args.owner,
      args.repo,
      args.defaultHash,
      args.contributor_id
    );
    return res;
  },
  getContributorID: async (args) => {
    const res = await getContributorID(
      args.owner,
      args.repo,
      args.defaultHash,
      args.contributor_name
    );
    return res;
  },
  getContributorSignature: async (args) => {
    const res = await getContributorSignature(
      args.owner,
      args.repo,
      args.defaultHash,
      args.contributor_id
    );
    return res;
  },
  getUser: async (args) => {
    const res = await getUser(args.contributor_id);
    return res;
  },
  setToken: async (args) => {
    const res = await setToken(args.contributor_id, args.token);
    return res;
  },
};

const port = process.env.PORT || 4003;

const app = express();

app.listen(port);
console.log(
  `Namespace Server: Running a GraphQL API server on port ${port}/graphql`
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

try {
  //Will delete data delete data from db on npm start:
  db.sync({ force: true });

  //Will not delete data from db on npm start:
  // db.sync();

  db.authenticate();
  console.log(
    "Connection to the Postgres database has been established successfully."
  );
} catch (error) {
  console.error("Unable to connect to the Postgres database:", error);
}
