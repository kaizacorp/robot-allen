const fetch = require("node-fetch");
const fs = require("fs");

// Text file to persist list tracking recent gif IDs.
let recentGifID = read("./commands/recentGifID.txt");

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
