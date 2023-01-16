const Discord = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();

module.exports = async function (msg, tokens, command) {
  let apiURL = `${process.env.API_URL}/count`;
  let response = await fetch(apiURL);
  let resp = await response.json();

  let title = "Library of Allenxandria GIFs:";
  let reply = "**" + resp.count + "**";

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(title)
    .setDescription(reply);

  msg.channel.send({ embeds: [embed] });
};
