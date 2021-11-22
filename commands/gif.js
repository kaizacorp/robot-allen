const fetch = require("node-fetch");
const fs = require("fs");

// Text file to persist list tracking recent gif IDs.
let recentGifID = read("./commands/recentGifID.txt");

module.exports = async function (msg, tokens) {
  try {
    // Tokens after !gif command treated as search terms added on to allenxandria tag
    if (tokens.length > 0) {
      tokens.unshift("allenxandria");
      let terms = tokens
        .join(" ")
        .replace(/[’'"“”]+/g, "")
        .toLowerCase();
      // Check for unindexed terms before making request to Tenor
      // TODO: refactor into some kind of database?
      let gif = "";
      if (terms.includes("bagel") || terms.includes("you are a bagel")) {
        gif = "https://tenor.com/bFDiN.gif";
        msg.channel.send(gif);
        return;
      }
      if (
        terms.includes("chewbacca") ||
        terms.includes("perturbed") ||
        terms.includes("noise")
      ) {
        /* Errors with this particular gif being indexed on Tenor
        gif = "";
        msg.channel.send(gif);
        return;
        */
      }
      if (terms.includes("croissant") || terms.includes("i am eating")) {
        /* Errors with this particular gif being indexed on Tenor
        gif = "";
        msg.channel.send(gif);
        return;
        */
      }
      /* gif for 'true' reject by Tenor
      if (terms.includes("true") || terms.includes("all true")) {
        gif = "";
        msg.channel.send(gif);
        return;
      }*/
      let tenorURL = `https://api.tenor.com/v1/search?q=${terms}&key=${process.env.TENORKEY}&limit=1&contentfilter=medium&locale=en_US&media_filter=minimal`;
      let response = await fetch(tenorURL);
      let json = await response.json();
      if (!json.results || !json.results[0]) {
        console.log("Error with response json.");
        return;
      } else {
        gif = json.results[0].url;
      }
      // If no matching terms, Tenor will currently select the discworld gif.
      // Assuming this, the 'default' gif can be set to the boosh gif.
      let isDiscworldSearch =
        terms.includes("disc") || terms.includes("discworld");

      if (!isDiscworldSearch && gif === "https://tenor.com/by3kp.gif") {
        gif = "https://tenor.com/view/allenxandria-boosh-gif-20708353";
      }

      msg.channel.send(gif);
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

function read(path) {
  let fileContent;
  let array;
  try {
    fileContent = fs.readFileSync(path);
    array = JSON.parse(fileContent);
  } catch (err) {
    console.log("Error reading text file:", err);
    array = [];
  }
  return array;
}

function write(array, path) {
  fs.writeFileSync(path, JSON.stringify(array));
}

// Always write the current list of recentGifID's to txt when closing to
// Persist in between shutdowns
function exitHandler(callback) {
  write(recentGifID, "./commands/recentGifID.txt");
}

process.on("SIGINT", function () {
  write(recentGifID, "./commands/recentGifID.txt");
  console.log("Ctrl-C...");
  process.exit(2);
});
