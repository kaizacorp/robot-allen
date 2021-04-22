require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

console.log("Have you met Allen?");

client.login(process.env.BOTTOKEN);

client.on("ready", () => {
  console.log("💖");
});

const commandHandler = require("./commands");

client.on("message", commandHandler);
