const Discord = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();

module.exports = async function (msg, tokens, command) {
  const apiURL = `${process.env.API_URL}/count`;
  const response = await fetch(apiURL);
  const resp = await response.json();

  const title = "Library of Allenxandria GIFs:";
  const reply = "**" + resp.count + "**";

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(title)
    .setDescription(reply);

  msg.channel.send({ embeds: [embed] });
};
