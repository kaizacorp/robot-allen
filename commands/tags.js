const fetch = require("node-fetch");
require("dotenv").config();

module.exports = async function (msg, tokens) {
  try {
    // default API endpoint as random gif
    let apiURL = `${process.env.API_URL}/random`;
    // if tokens exist, use on tags endpoint
    if (tokens.length > 0) {
      let url = tokens;
      apiURL = `${process.env.API_URL}/tags?url=${url}`;
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
