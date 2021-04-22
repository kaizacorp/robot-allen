const gif = require("./commands/gif.js");
const tbr = require("./commands/tbr.js");

const commands = { gif, tbr };

module.exports = async function (msg) {
  console.log(msg.content);
  let tokens = msg.content.split(" ");
  let command = tokens.shift();
  if (command.charAt(0) === "!") {
    command = command.substring(1);
    commands[command](msg, tokens);
  }
};
