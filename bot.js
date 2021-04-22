require("dotenv").config();
const fetch = require("node-fetch");
console.log("Have you met Allen?");

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("💖");
}

client.on("message", gotMessage);

let recentGifID = [];
async function gotMessage(msg) {
  console.log(msg.content);
  if (msg.channel.id == "834826825943089184" && msg.content === "!gif") {
    //let tenorURL = `https://api.tenor.com/v1/search?q=allenxandria&key=${process.env.TENORKEY}&limit=50`;
    let tenorURL = `https://g.tenor.com/v1/random?q=allenxandria&key=${process.env.TENORKEY}&limit=50`;
    let response = await fetch(tenorURL);
    let json = await response.json();
    //console.log(json);
    let index = Math.floor(Math.random() * json.results.length);
    while (recentGifID.includes(json.results[index].id)) {
      console.log("Repeat detected! Stop the madness!", json.results[index].id);
      index = Math.floor(Math.random() * json.results.length);
    }
    recentGifID.push(json.results[index].id);
    if (recentGifID.length > 8) {
      recentGifID.shift();
    }
    console.log(recentGifID);
    msg.channel.send(json.results[index].url);
  }
}
