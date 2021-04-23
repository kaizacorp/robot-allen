const gif = require("./commands/gif.js");
const tbr = require("./commands/tbr.js");

const commands = { gif, tbr };

module.exports = async function (msg) {
  let tokens = msg.content;
  if (tokens.length > 0) {
    tokens = tokens.match(/(?:[^\s"]+|"[^"]*")+/g);
    let command = tokens.shift();
    if (command.charAt(0) === "!") {
      command = command.substring(1);
      if (command in commands) {
        console.log(command, tokens, msg.author.username);
        commands[command](msg, tokens);
      } else {
        msg.channel.send(
          "Sorry, I don't know how to handle " + command + "...yet 🤖";
          console.log("Command: ", command, "attempted.")
        );
      }
    }
  }
};
