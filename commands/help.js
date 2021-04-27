const Discord = require("discord.js");
module.exports = async function (msg, tokens, command) {
  let title = "";
  let reply =
    "Here is a list of available commands: `gif`, `help`, `tbr`.\n" +
    "You can send `!help <command name>` to get additional information on all of Allenbot's commands.";
  if (tokens.length === 0) {
  } else if (command === "gif") {
    title = "!gif command usage";
    reply =
      "This is the `!gif` command.\n" +
      "You can send `!gif` for a random Library of Allenxandria GIF straight from the depths of Tenor (lovingly crafted by the one and only Evie!)";
  } else if (command === "help") {
    title = "!help command usage";
    reply =
      "This is the `!help` command.\n" +
      reply +
      "\n" +
      "If you have suggestions for improving Allenbot please message @Kai";
  } else if (command === "tbr") {
    title = "!tbr command usage";
    "This is the `!tbr` command.\n" +
      "You can send `!tbr <choice1> <choice2> ...` to have Allenbot decide your TBR (To Be Read) for you!\n" +
      "Allenbot has special response for certain titles, see if you can find them!";
  }

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(title)
    .msg.channel.send(embed);
};
