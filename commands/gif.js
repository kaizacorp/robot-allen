const fetch = require("node-fetch");

module.exports = async function (msg, tokens) {
  try {
    // Tokens after !gif command treated as search terms added on to allenxandria tag
    if (tokens.length > 0) {
      let terms = tokens
        .join(" ")
        .replace(/[’'"“”]+/g, "")
        .toLowerCase();
      let apiURL = `http://localhost:3000/search?tags=${terms}`;
      let response = await fetch(apiURL);
      let json = await response.json();
      msg.channel.send(json[0].url);
    } else {
      let apiURL = "http://localhost:3000/random";
      let response = await fetch(apiURL);
      let json = await response.json();
      msg.channel.send(json.url);
    }
  } catch (error) {
    console.log(error);
  }
};
