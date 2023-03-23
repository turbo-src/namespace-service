const superagent = require("superagent");
require("dotenv").config();

const port =
  process.env.NODE_ENV === "fly"
    ? "https://turbosrc-reibase-namespace.fly.dev"
    : "http://localhost:4003";

var root = {
  postCreateUser: async (
    owner,
    repo,
    contributor_id,
    contributor_name,
    contributor_signature,
    token
  ) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ createUser(owner: "${owner}", repo: "${repo}", contributor_id: "${contributor_id}", contributor_name: "${contributor_name}", contributor_signature: "${contributor_signature}", token: "${token}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.createUser;
  },
  postGetContributorName: async (owner, repo, defaultHash, contributor_id) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getContributorName(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}") }`,
      })
      .set("accept", "json");
    // .end((err, res) => {
    //   const json = JSON.parse(res.text);
    //   return json.data.getContributorName;
    // });
    const json = JSON.parse(res.text);
    return json.data.getContributorName;
  },
  postGetContributorID: async (owner, repo, defaultHash, contributor_name) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getContributorID(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_name: "${contributor_name}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    //});
    const json = JSON.parse(res.text);
    return json.data.getContributorID;
  },
  postGetContributorSignature: async (owner, repo, defaultHash, contributor_id) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getContributorSignature(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    //});
    const json = JSON.parse(res.text);
    return json.data.getContributorSignature;
  },
  getUser: async (contributor_id) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getUser(contributor_id: "${contributor_id}") {contributor_name, contributor_id, contributor_signature, token}}`,
      })
      .set("accept", "json");
    const json = JSON.parse(res.text);
    return json.data.getUser;
  },
  findOrCreateUser: async (
    owner,
    repo,
    contributor_id,
    contributor_name,
    contributor_signature,
    token) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ findOrCreateUser(owner: "${owner}", repo: "${repo}", contributor_id: "${contributor_id}", contributor_name: "${contributor_name}", contributor_signature: "${contributor_signature}", token: "${token}") {contributor_name, contributor_id, contributor_signature, token}}`,
      })
      .set("accept", "json");
    const json = JSON.parse(res.text);
    return json.data.findOrCreateUser;
  },
  createRepo: async (
    repo_name,
    repo_id,
    repo_signature,
    contributor_id,
    repo_uri,
    app,
    metadata
  ) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ createRepo(repo_name: "${repo_name}", repo_id: "${repo_id}", repo_signature: "${repo_signature}", contributor_id: "${contributor_id}", repo_uri: "${repo_uri}", app: "${app}", metadata: "${metadata}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.createRepo;
  },
};

module.exports = root;
