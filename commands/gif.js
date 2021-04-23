const fetch = require("node-fetch");

let recentGifID = [];
module.exports = async function (msg) {
  //let tenorURL = `https://api.tenor.com/v1/search?q=allenxandria&key=${process.env.TENORKEY}&limit=50`;
  let tenorURL = `https://g.tenor.com/v1/random?q=allenxandria&key=${process.env.TENORKEY}&limit=50`;
  let response = await fetch(tenorURL);
  let json = await response.json();
  let index = Math.floor(Math.random() * json.results.length);
  while (recentGifID.includes(json.results[index].id)) {
    console.log("Repeat detected! Stop the madness!", json.results[index].id);
    index = Math.floor(Math.random() * json.results.length);
  }
  recentGifID.push(json.results[index].id);
  if (recentGifID.length > 25) {
    recentGifID.shift();
  }
  console.log(recentGifID);
  msg.channel.send(json.results[index].url);
};
