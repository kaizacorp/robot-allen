require("dotenv").config();
//const Discord = require("discord.js");
//const client = new Discord.Client();
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

console.log("Have you met Allen?");

client.login(process.env.BOTTOKEN);

client.on("ready", () => {
  console.log("💖");
});

const commandHandler = require("./commands");

client.on("messageCreate", commandHandler);
