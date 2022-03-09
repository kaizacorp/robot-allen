const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const commands = [
  new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Replies with a random Library of Allenxandria GIF!"),
  new SlashCommandBuilder()
    .setName("tbr")
    .setDescription(
      "Replies with the next book Allenbot thinks you should read!"
    ),
  new SlashCommandBuilder()
    .setName("count")
    .setDescription(
      "Replies with the current count of GIFs in the Library of Allenxandria archives"
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

await rest.put(Routes.applicationCommands(clientId), { body: commands });
