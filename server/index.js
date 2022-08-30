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
} = require("../lib");

var schema = buildSchema(`
  type Query {
    createUser(owner: String, repo: String, contributor_id: String, contributor_name: String, contributor_signature: String): String,
    getContributorName(owner: String, repo: String, pr_id: String, contributor_id: String): String,
    getContributorID(owner: String, repo_id: String, pr_id: String, contributor_name: String): String,
    getContributorSignature(owner: String, repo: String, pr_id: String, contributor_id: String): String,
  }
`);

var root = {
  createUser: async (args) => {
    return await createUser(
      args.owner,
      args.repo,
      args.contributor_id,
      args.contributor_name,
      args.contributor_signature
    );
  },
  getContributorName: async (args) => {
    return await getContributorName(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id
    );
  },
  getContributorID: async (args) => {
    let contributorID = await getContributorID(
      args.owner,
      args.repo_id,
      args.pr_id,
      args.contributor_name
    );
    return contributorID;
  },
  getContributorSignature: async (args) => {
    return await getContributorSignature(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id
    );
  },
};

const port = process.env.PORT || 4003;

const app = express();

app.listen(port);
console.log(`Running a GraphQL API server on port ${port}/graphql`);

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
