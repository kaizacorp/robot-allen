import gif from "./commands/gif.js";
import help from "./commands/help.js";
import tbr from "./commands/tbr.js";
import count from "./commands/count.js";
import tags from "./commands/tags.js";

const commands = { gif, help, tbr, count, tags };

export default async function (msg) {
  let tokens = msg.content;
  if (tokens.length > 0) {
    tokens = tokens.replace(/["“”]+/g, '"');
    tokens = tokens.replace(/[,]+/g, " ");
    tokens = tokens.match(/(?:[^\s"]+|"[^"]*")+/g);
    if (!tokens) {
      return;
    }

    const firstWord = tokens.shift();
    //if (firstWord.charAt(0) !== "!") {
    //  return;
    //}

    let server = "DM";
    if (msg.guild) {
      server = msg.guild.name;
    }

    const command = firstWord.substring(1);
    if (command in commands) {
      console.log(command, tokens, msg.author.username, "@", server);
      commands[command](msg, tokens);
    } else if (firstWord.toLowerCase().includes("allenbot")) {
      console.log(
        "Allenbot trigger: ",
        tokens.join(" "),
        msg.author.username,
        "@",
        server
      );
      commands["gif"](msg, []);
    }
  }
}
