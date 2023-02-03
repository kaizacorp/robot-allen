const fetch = require("node-fetch");
require("dotenv").config();

const defaultGif =
  "https://cdn.discordapp.com/attachments/834826825943089184/1061332404708577300/allenxandria-boosh.gif";

module.exports = async function (msg, tokens) {
  try {
    // default API endpoint as /random
    let apiURL = `${process.env.API_URL}/random?key=${process.env.ACCESS_KEY}`;
    // /search if terms given
    if (tokens.length > 0) {
      const terms = tokens
        .join(" ")
        .replace(/["“”]+/g, "")
        .toLowerCase();
      apiURL = `${process.env.API_URL}/search?tags=${terms}`;
    }
    const response = await fetch(apiURL);
    const json = await response.json();
    let gif = defaultGif;
    if (Object.keys(json).length !== 0 && json.url !== "") {
      gif = json.url;
    }
    msg.channel.send(gif);
  } catch (error) {
    console.log(error);
  }
};
