const fetch = require("node-fetch");
const fs = require("fs");

// text file to persist list tracking recent gif IDs.
let recentGifID = read("./commands/recentGifID.txt");

module.exports = async function (msg, tokens) {
  try {
    // tokens after !gif command treated as search terms added on to allenxandria tag
    if (tokens.length > 0) {
      tokens.unshift("allenxandria");
      let terms = tokens
        .join(" ")
        .replace(/[’'"“”]+/g, "")
        .toLowerCase();
      // check for unindexed terms before making request to tenor
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
        gif = "https://tenor.com/bFEeE.gif";
        msg.channel.send(gif);
        return;
      }
      if (terms.includes("croissant") || terms.includes("i am eating")) {
        gif = "https://tenor.com/bGhgq.gif";
        msg.channel.send(gif);
        return;
      }
      let tenorURL = `https://api.tenor.com/v1/search?q=${terms}&key=${process.env.TENORKEY}&limit=1&contentfilter=medium&locale=en_US&media_filter=basic`;
      let response = await fetch(tenorURL);
      let json = await response.json();
      if (!json.results || !json.results[0]) {
        console.log("Error with response json.");
        return;
      } else {
        gif = json.results[0].url;
      }
      // if no matching terms, tenor will currently select the discworld gif.
      // Assuming this, the 'default' gif can be set to the boosh gif.
      let isDiscworldSearch =
        terms.includes("discworld") ||
        terms.includes("disc") ||
        gif === "https://tenor.com/by3kp.gif";
      if (isDiscworldSearch) {
        gif = "https://tenor.com/view/allenxandria-boosh-gif-20708353";
      }
      msg.channel.send(gif);
    } else {
      let limit = 50;
      let tenorURL = `https://g.tenor.com/v1/random?q=allenxandria&key=${process.env.TENORKEY}&limit=${limit}`;
      let response = await fetch(tenorURL);
      let json = await response.json();
      if (!json.results) {
        console.log("Error with response json in random.");
        return;
      }
      let index = Math.floor(Math.random() * json.results.length);
      //prevent repetitions of last number of gifs -> determined by size of recentGifID list
      let uniqueAttempts = 0;
      let gif = json.results[index];
      let gifID = json.results[index].id;
      while (recentGifID.includes(gifID)) {
        let lastID = gifID;
        let last = gif;
        json.results.splice(index, 1); // remove gif so it's not selected again
        uniqueAttempts += 1;
        index = Math.floor(Math.random() * json.results.length);
        gifID = json.results[index].id;
        gif = json.results[index];
        if (uniqueAttempts >= limit - 1) {
          console.log("No unique gif ID! Resetting list...");
          uniqueAttempts = 0;
          recentGifID = [];
          gifID = lastID;
          gif = last;
        }
      }
      recentGifID.push(gifID);
      if (recentGifID.length >= limit) {
        if (recentGifID) {
          recentGifID.shift();
        }
      }

      console.log(uniqueAttempts, recentGifID.length);
      msg.channel.send(gif.url);
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
