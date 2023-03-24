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
  findOrCreateUser,
  createRepo,
  getRepo,
  setRepo,
} = require("../lib");

var schema = buildSchema(`
type User {
  contributor_name: String!,
  contributor_id: String!,
  contributor_signature: String!,
  token: String!,
}
type Repo {
  repo_name: String!,
  repo_id: String!,
  repo_signature: String!,
  contributor_id: String!,
  app: String!,
  repo_uri: String!,
  metadata: String!,
}
  type Query {
    createUser(owner: String, repo: String, contributor_id: String, contributor_name: String, contributor_signature: String, token: String): String,
    getContributorName(owner: String, repo: String, defaultHash: String, contributor_id: String): String,
    getContributorID(owner: String, repo: String, defaultHash: String, contributor_name: String): String,
    getContributorSignature(owner: String, repo: String, defaultHash: String, contributor_id: String): String,
    getUser(contributor_id: String): User,
    findOrCreateUser(owner: String, repo: String, contributor_id: String, contributor_name: String, contributor_signature: String, token: String): User,
    createRepo(repo_name: String, repo_id: String, repo_signature: String, contributor_id: String, app: String, repo_uri: String, metadata: String): String,
    setRepo(repo_name: String, repo_id: String, repo_signature: String, contributor_id: String, app: String, repo_uri: String, metadata: String): String,
    getRepo(repo_name: String): Repo,
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
  findOrCreateUser: async (args) => {
    const res = await findOrCreateUser(
      args.owner,
      args.repo,
      args.contributor_id,
      args.contributor_name,
      args.contributor_signature,
      args.token
    );
    return res;
  },
  createRepo: async (args) => {
    const res = await createRepo(
      args.repo_name,
      args.repo_id,
      args.repo_signature,
      args.contributor_id,
      args.app,
      args.repo_uri,
      args.metadata
    );
    return res;
  },
  getRepo: async (args) => {
    const res = await getRepo(args.repo_name);
    return res;
  },
  setRepo: async (args) => {
    const res = await setRepo(
      args.repo_name,
      args.repo_id,
      args.repo_signature,
      args.contributor_id,
      args.app,
      args.repo_uri,
      args.metadata
    );
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
