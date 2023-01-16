const fetch = require("node-fetch");
const defaultGif =
  "https://cdn.discordapp.com/attachments/834826825943089184/1061332404708577300/allenxandria-boosh.gif";

module.exports = async function (msg, tokens) {
  try {
    // default API endpoint as random gif
    let apiURL = `http://localhost:3000/random?key=${process.env.ACCESS_KEY}`;
    // if tokens exist, use on search endpoint
    if (tokens.length > 0) {
      let terms = tokens
        .join(" ")
        .replace(/["“”]+/g, "")
        .toLowerCase();
      apiURL = `http://localhost:3000/search?tags=${terms}`;
    }
    let response = await fetch(apiURL);
    let json = await response.json();
    let gif = defaultGif;
    if (Object.keys(json).length !== 0 && json.url !== "") {
      gif = json.url;
    }
    msg.channel.send(gif);
  } catch (error) {
    console.log(error);
  }
};
