const fetch = require("node-fetch");
const fs = require("fs");

//let recentGifID = [];
let recentGifID = read("./commands/recentGifID.txt");

module.exports = async function (msg, tokens) {
  try {
    // tokens after !gif command treated as search terms added on to allenxandria tag
    if (tokens.length > 0) {
      tokens.unshift("allenxandria");
      let terms = tokens
        .join(" ")
        .replace(/['"“”]+/g, "")
        .toLowerCase();
      let tenorURL = `https://api.tenor.com/v1/search?q=${terms}&key=${process.env.TENORKEY}&limit=1`;
      let response = await fetch(tenorURL);
      let json = await response.json();
      let gif = json.results[0].url;
      let isDiscworldSearch =
        terms.includes("discworld") ||
        terms.includes("disc") ||
        gif === "https://tenor.com/by3kp.gif";
      if (isDiscworldSearch) {
        gif = "https://tenor.com/view/allenxandria-boosh-gif-20708353";
      }
      if (terms.includes("bagel") || terms.includes("you are a bagel")) {
        gif = "https://tenor.com/bFDiN.gif";
      }
      if (
        terms.includes("chewbacca") ||
        terms.includes("perturbed") ||
        terms.includes("noise")
      ) {
        gif = "https://tenor.com/bFEeE.gif";
      }
      msg.channel.send(gif);
    } else {
      let tenorURL = `https://g.tenor.com/v1/random?q=allenxandria&key=${process.env.TENORKEY}&limit=50`;
      let response = await fetch(tenorURL);
      let json = await response.json();
      let index = Math.floor(Math.random() * json.results.length);
      //prevent repetitions of last number of gifs -> limit param
      let uniqueAttempts = 0;
      while (recentGifID.includes(json.results[index].id)) {
        uniqueAttempts += 1;
        index = Math.floor(Math.random() * json.results.length);
        if (uniqueAttempts > recentGifID.length) {
          console.log("Gif loop occurred!");
          recentGifID = [];
        }
      }
      recentGifID.push(json.results[index].id);
      if (recentGifID.length >= json.results.length) {
        if (recentGifID) {
          recentGifID.shift();
        }
      }

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
