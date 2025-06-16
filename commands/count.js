import Discord from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";

export default async function (msg, tokens, command) {
  const apiURL = `${process.env.API_URL}/count`;
  const response = await fetch(apiURL);
  const resp = await response.json();

  const title = "Library of Allenxandria GIFs:";
  const reply = "**" + resp.count + "**";

  const embed = new Discord.EmbedBuilder()
    .setTitle(title)
    .setDescription(reply);

  msg.channel.send({ embeds: [embed] });
}
