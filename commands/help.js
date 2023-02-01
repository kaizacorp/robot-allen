const Discord = require("discord.js");

module.exports = async function (msg, tokens, command) {
  let title = "I am Allenbot, how can I help you?";
  let reply =
    "Here is a list of available commands: `!gif`, `!help`, `!tbr`.\n" +
    "You can send `!help <command name>` to get additional information on all my commands.";
  if (tokens.length === 0) {
  } else if (tokens[0] === "gif") {
    title = "!gif command usage";
    reply =
      "This is the `!gif` command.\n" +
      "You can send `!gif` for a random Library of Allenxandria GIF (lovingly crafted by the one and only Evie!)\n" +
      "You can also send `!gif term1 term2 ...` to search for a specific Allen gif.";
  } else if (tokens[0] === "help") {
    title = "!help command usage";
    reply =
      "This is the `!help` command.\n" +
      reply +
      "\n" +
      "If you have suggestions for improving Allenbot please message KaizaCorp#1337";
  } else if (tokens[0] === "tbr") {
    title = "!tbr command usage";
    reply =
      "This is the `!tbr` command.\n" +
      "You can send `!tbr 'choice1' 'choice2' ...` to have Allenbot decide your TBR for you!\n" +
      "Allenbot has special responses for certain titles, see if you can find them!\n" +
      "You can send `!tbr <goodreads/storygraph shelf link>` to have Allenbot randomly select a book from your shelf!";
  } else if (tokens[0] === "tags") {
    title = "!tag command usage";
    reply =
      "This is the `!tags` command.\n" +
      "You can send `!tags gif-url` to have Allenbot tell you which tags are associated with a given gif URL.";
  } else {
    title = "Unknown command?";
    reply =
      "I'm sorry, I can't help you with that command!\n" +
      "Try `!help gif`, `!help tbr`, or `!help help` for more details.";
  }

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(title)
    .setDescription(reply);

  msg.channel.send({ embeds: [embed] });
};
