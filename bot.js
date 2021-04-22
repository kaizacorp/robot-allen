require("dotenv").config();

console.log("Have you met Allen?");

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("💖");
}

const commandHandler = require("./commands");

client.on("message", commandHandler);
