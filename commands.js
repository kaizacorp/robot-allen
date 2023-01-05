const gif = require("./commands/gif.js");
const help = require("./commands/help.js");
const tbr = require("./commands/tbr.js");
const count = require("./commands/count.js");
const tags = require("./commands/tags.js");

const commands = { gif, help, tbr, count, tags };

module.exports = async function (msg) {
  let tokens = msg.content;
  if (tokens.length > 0) {
    tokens = tokens.replace(/["“”]+/g, '"');
    tokens = tokens.replace(/[,]+/g, " ");
    tokens = tokens.match(/(?:[^\s"]+|"[^"]*")+/g);
    let command = "";
    if (tokens) {
      command = tokens.shift();
    }

    let server = "DM";
    if (msg.guild) {
      server = msg.guild.name;
    }

    if (command.charAt(0) === "!") {
      command = command.substring(1);
      if (command in commands) {
        console.log(command, tokens, msg.author.username, "@", server);
        commands[command](msg, tokens);
      }
    } else if (command.toLowerCase().includes("allenbot")) {
      console.log(command, tokens.join(" "), msg.author.username, "@", server);
      commands["gif"](msg, []);
    }
  }
};
