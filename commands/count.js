const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = async function (msg, tokens, command) {
  let apiURL = "http://localhost:3000/count";
  let response = await fetch(apiURL);
  let count = await response.json();

  let title = "Allenxandria GIF Count:";
  let reply = "**" + count + "**";

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(title)
    .setDescription(reply);

  msg.channel.send(embed);
};
