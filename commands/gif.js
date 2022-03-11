const fetch = require("node-fetch");
const defaultGif = "https://tenor.com/view/allenxandria-boosh-gif-20708353";

module.exports = async function (msg, tokens) {
  try {
    // Tokens after !gif command treated as search terms
    if (tokens.length > 0) {
      let terms = tokens
        .join(" ")
        .replace(/[’'"“”]+/g, "")
        .toLowerCase();
      let apiURL = `http://localhost:3000/search?tags=${terms}`;
      let response = await fetch(apiURL);
      let json = await response.json();
      let gif = defaultGif;
      if (json.length > 0) {
        gif = json[0].url;
      }
      msg.channel.send(gif);
      // Or no tokens after !gif command replies with random gif
    } else {
      let apiURL = "http://localhost:3000/random";
      let response = await fetch(apiURL);
      let json = await response.json();
      let gif = defaultGif;
      if (Object.keys(json).length !== 0 && json.url !== "") {
        gif = json.url;
      }
      msg.channel.send(gif);
    }
  } catch (error) {
    console.log(error);
  }
};
