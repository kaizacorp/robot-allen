const fetch = require("node-fetch");
const fs = require("fs");

//let recentGifID = [];
let recentGifID = read("./commands/recentGifID.txt");

module.exports = async function (msg, tokens) {
  try {
    // tokens after !gif command treated as search terms added on to allenxandria tag
    if (tokens.length > 0) {
      let terms = "allenxandria " + tokens.join(" ");
      terms = terms.replace(/['"“”]+/g, "");
      let tenorURL = `https://api.tenor.com/v1/search?q=${terms}&key=${process.env.TENORKEY}&limit=1`;
      let response = await fetch(tenorURL);
      let json = await response.json();
      msg.channel.send(json.results[0].url);
    } else {
      let tenorURL = `https://g.tenor.com/v1/random?q=allenxandria&key=${process.env.TENORKEY}&limit=50`;
      let response = await fetch(tenorURL);
      let json = await response.json();
      let index = Math.floor(Math.random() * json.results.length);
      //prevent repetitions of last 24 gifs
      let uniqueAttempts = 0;
      while (recentGifID.includes(json.results[index].id)) {
        uniqueAttempts += 1;
        index = Math.floor(Math.random() * json.results.length);
      }
      recentGifID.push(json.results[index].id);
      if (recentGifID.length >= 25) {
        if (recentGifID) {
          recentGifID.shift();
        }
      }
      console.log(recentGifID.length, uniqueAttempts);

      msg.channel.send(json.results[index].url);
    }
  } catch (error) {
    console.log(error);
  }
};

function write(array, path) {
  fs.writeFileSync(path, JSON.stringify(array));
}

function read(path) {
  const fileContent = fs.readFileSync(path);
  const array = JSON.parse(fileContent);
  return array;
}

function exitHandler(callback) {
  write(recentGifID, "./commands/recentGifID.txt");
}
process.on("SIGINT", function () {
  write(recentGifID, "./commands/recentGifID.txt");
  console.log("Ctrl-C...");
  process.exit(2);
});
