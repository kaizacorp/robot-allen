require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const commandHandler = require("./commands");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

console.log("Have you met Allen?");

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
  console.log("💖");
});

client.on("messageCreate", commandHandler);
