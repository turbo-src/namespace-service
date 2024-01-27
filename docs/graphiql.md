
{
  postCreateUser(
    contributor_id: "0x09D56A39599Dd81e213EB2A9Bd6785945B662662",
    contributor_name: "tsrctester1",
    contributor_password: "e0c911adbce919ea366cdeb5015b18b0e7980e659c3a89cd962a29ff743370b8"
  ) {
    status
    message
    info {
      contributor_id
      contributor_name
    }
  }
}

{
  getUser(contributor_id: "0x09D56A39599Dd81e213EB2A9Bd6785945B662662") {
    status
    message
    info {
      contributor_id
      contributor_name
    }
  }
}
