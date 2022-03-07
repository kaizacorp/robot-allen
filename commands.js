const gif = require("./commands/gif.js");
const help = require("./commands/help.js");
const tbr = require("./commands/tbr.js");
const count = require("./commands/count.js");

const commands = { gif, help, tbr, count };

module.exports = async function (msg) {
  let tokens = msg.content;
  if (tokens.length > 0) {
    tokens = tokens.replace(/["“”]+/g, '"');
    tokens = tokens.replace(/[,]+/g, " ");
    //tokens = tokens.replace(/[.]+/g, " ");
    tokens = tokens.replace(/[?]+/g, " ");
    tokens = tokens.match(/(?:[^\s"]+|"[^"]*")+/g);
    let command = "";
    if (tokens) {
      command = tokens.shift();
    }
    if (command.charAt(0) === "!") {
      command = command.substring(1);
      let server = "PM";
      if (msg.guild) {
        server = msg.guild.name;
      }
      if (command in commands) {
        console.log(command, tokens, msg.author.username, "@", server);
        commands[command](msg, tokens);
      }
    } else if (command.toLowerCase() === "allenbot") {
      console.log(
        "Allenbot",
        tokens.join(" "),
        msg.author.username,
        "@",
        msg.guild.name
      );
      commands["gif"](msg, []);
    }
  }
};
