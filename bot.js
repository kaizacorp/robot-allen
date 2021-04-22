require("dotenv").config();
console.log("Have you met Allen?");

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("💖");
}

const replies = [
  "have-you-met-allen.gif",
  "it-tastes-so-sweeeeet.gif",
  "that's the worst pirate I've ever seen!",
  "That's the best pirate I've ever seen!",
  "Hahahaha",
];

client.on("message", gotMessage);

function gotMessage(msg) {
  console.log(msg.content);
  if (msg.channel.id == "834826825943089184" && msg.content === "!gif") {
    const index = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[index]);
  }
}
