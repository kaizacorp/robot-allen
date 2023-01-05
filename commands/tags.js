const fetch = require("node-fetch");

module.exports = async function (msg, tokens) {
  try {
    // default API endpoint as random gif
    let apiURL = "http://localhost:3000/random";
    // if tokens exist, use on tags endpoint
    if (tokens.length > 0) {
      let url = tokens;
      apiURL = `http://localhost:3000/tags?url=${url}`;
    }
    let response = await fetch(apiURL);
    let json = await response.json();
    let tags = "No matching tags found for given url";
    if (Object.keys(json).length !== 0 && json.tags !== "") {
      tags = json.tags;
    }
    msg.channel.send("Tags: " + tags);
  } catch (error) {
    console.log(error);
  }
};
