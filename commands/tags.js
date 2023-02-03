const fetch = require("node-fetch");
require("dotenv").config();

module.exports = async function (msg, tokens) {
  try {
    let tagsMessage = "Invalid URL to perform tag search.";
    if (!tokens || tokens.length === 0) {
      msg.channel.send(tagsMessage);
      return;
    }

    const url = tokens;
    const apiURL = `${process.env.API_URL}/tags?url=${url}`;
    const response = await fetch(apiURL);
    const json = await response.json();

    tagsMessage = "No matching tags found for given URL.";
    if (Object.keys(json).length !== 0 && json.tags !== "") {
      tagsMessage = json.tags;
    }

    msg.channel.send("Tags: " + tagsMessage);
  } catch (error) {
    console.log(error);
  }
};
