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

// Will clear database data on npm start with {force: true}:
// db.sync({force:true})
// Will NOT clear database data on npm start:
db.sync()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});