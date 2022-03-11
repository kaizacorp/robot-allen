const fetch = require("node-fetch");
const defaultGif = "https://tenor.com/view/allenxandria-boosh-gif-20708353";

module.exports = async function (msg, tokens) {
  try {
    // default API endpoint as random gif
    let apiURL = "http://localhost:3000/random";
    // if tokens exist, use on search endpoint
    if (tokens.length > 0) {
      let terms = tokens
        .join(" ")
        .replace(/[’'"“”]+/g, "")
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
