const { Message } = require("discord.js");
const gif = require("./commands/gif.js");
const tbr = require("./commands/tbr.js");

const commands = { gif, tbr };

module.exports = async function (msg) {
  if (msg.author.bot) return; // Robot Allen doesn't speak to other bots
  let tokens = msg.content.replace(/”/g, '"');
  tokens = tokens.match(/(?:[^\s"]+|"[^"]*")+/g);
  let command = tokens.shift();
  if (command.charAt(0) === "!") {
    command = command.substring(1);
    commands[command](msg, tokens);
  }
};
