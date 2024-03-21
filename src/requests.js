const superagent = require("superagent");
require("dotenv").config();

const port =
  process.env.NODE_ENV === "fly"
    ? "https://turbosrc-reibase-namespace.fly.dev"
    : "http://localhost:4003";

var root = {
  postCreateUser: async (
    contributor_id,
    contributor_name,
    contributor_password,
  ) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `
          {
            createUser(
              contributor_id: "${contributor_id}",
              contributor_name: "${contributor_name}",
              contributor_password: "${contributor_password}",
              ) {
              status
              message
              info {
                contributor_id
                contributor_name
              }
            }
          }
        `,
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
        query: `
	{
	  getUser(contributor_id: "${contributor_id}")
	  {
              status
              message
              info {
                contributor_id
                contributor_name
              }
            }
          }
        `,
      })
      .set('accept', 'json');
    const json = JSON.parse(res.text);
    return json.data.getUser;
  },
  getUserByName: async (contributor_name) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `
	{
	  getUserByName(contributor_name: "${contributor_name}")
	  {
              status
              message
              info {
                contributor_id
                contributor_name
              }
            }
          }
        `,
      })
      .set('accept', 'json');
    const json = JSON.parse(res.text);
    return json.data.getUserByName;
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
  findOrCreateRepo: async (
    repoName,
    repoID) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ findOrCreateRepo(repoName: "${repoName}", repoID: "${repoID}") {status, repoName, repoID, repoSignature, message}}`,
      })
      .set("accept", "json");
    const json = JSON.parse(res.text);
    return json.data.findOrCreateRepo;
  },
  getRepo: async (
    repoNameOrID) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getRepo(repoNameOrID: "${repoNameOrID}") {status, repoName, repoID, repoSignature, message}}`,
      })
      .set("accept", "json");
    const json = JSON.parse(res.text);
    return json.data.getRepo;
  },
};

module.exports = root;
