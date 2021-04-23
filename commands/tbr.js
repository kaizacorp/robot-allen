module.exports = async function (msg, tokens) {
  if (tokens.length === 0) {
    msg.channel.send("Robot Allen requires at least two (or more) choices");
  } else if (tokens.length === 1) {
    msg.channel.send("Do you wanna go for " + tokens + " again?");
  }
  let index = Math.floor(Math.random() * tokens.length);
  msg.channel.send(
    "You should all be reading " + tokens[index].replace(/['"”]+/g, "") + "."
  );
};
