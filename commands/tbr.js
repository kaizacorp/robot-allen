module.exports = async function (msg, tokens) {
  if (tokens.length === 0) {
    msg.channel.send("Robot Allen requires at least two (or more) choices");
  } else if (tokens.length === 1) {
    msg.channel.send("Do you wanna go for " + tokens + " again?");
  } else {
    let index = Math.floor(Math.random() * tokens.length);
    let book = tokens[index].replace(/['"”]+/g, "");
    let text = "";

    switch (book) {
      case "ACOMAF":
      case "ACOTAR":
      case "ACOSF":
      case "SJM":
        text = "You should all be reading " + book + ". I feel it in my bones!";
      case "LotR":
      case "LoTR":
      case "lotr":
      case "LOTR":
      case "Lord of the Rings":
      case "Fellowship of the Ring":
      case "The Two Towers":
      case "Two Towers":
      case "The Return of the King":
      case "Return of the King":
      case "The Hobbit":
      case "the hobbit":
        text =
          "You should all be reading " +
          book +
          ". I haven't even read " +
          book +
          " yet.";

      case "Dorothy Dunnett":
      case "The Lymond Chronicles":
      case "Lymond Chronicles":
        text = "Nice try Klaus. Klaus loves " + book + ".";
      case "Senlin":
      case "Senlin Ascends":
      case "SenlinAscends":
      case "AotS":
      case "Arm of the Sphinx":
      case "Hod King":
      case "HodKing":
      case "The Hod King":
      case "THK":
        text = "How bout' dem Senlin books?! I love " + book;
      case "Bees":
      case "bees":
        text = "I knew I was going to get" + book + ",every time!";
      case "no bees":
      case "no Bees":
      case "No Bees":
        text = "Well good, " + book + "was what I started with.";
      case "Discworld":
      case "discworld":
        text = "You should all be reading " + book + ". It is incredible.";
      case "The Faithful and the Fallen":
      case "Faithful and the Fallen":
      case "FatF":
      case "Malice":
      case "Valour":
      case "Valor":
      case "Ruin":
      case "Wrath":
      case "John Gwynne":
      case "Gwynne":
        text = "You should all be reading " + book + ". Go get em' Corban!";

      default:
        text = "You should all be reading " + book + ".";
    }

    msg.channel.send(text);
  }
};
