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
      let gif;
      if (json.length > 0) {
        gif = json[0].url;
      } else {
        // default gif
        gif = "https://tenor.com/view/allenxandria-boosh-gif-20708353";
        return;
      }
      msg.channel.send(gif);
    } else {
      let apiURL = "http://localhost:3000/random";
      let response = await fetch(apiURL);
      let json = await response.json();
      let gif;
      if (json) {
        gif = json.url;
      } else {
        // default gif
        gif = "https://tenor.com/view/allenxandria-boosh-gif-20708353";
        return;
      }
      msg.channel.send(gif);
    }
  } catch (error) {
    console.log(error);
  }
};
