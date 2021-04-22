module.exports = async function (msg, tokens) {
  let index = Math.floor(Math.random() * tokens.length);
  msg.channel.send(
    "You should all be reading " + tokens[index].replace(/['"]+/g, "") + "."
  );
};
