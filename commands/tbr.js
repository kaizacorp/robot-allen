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
        break;
      case "LotR":
      case "LoTR":
      case "lotr":
      case "LOTR":
      case "Lord of the Rings":
      case "lord of the rings":
      case "Fellowship of the Ring":
      case "fellowship of the ring":
      case "The Two Towers":
      case "Two Towers":
      case "two towers":
      case "The Return of the King":
      case "Return of the King":
      case "return of the king":
      case "The Hobbit":
      case "the hobbit":
        text =
          "You should all be reading " +
          book +
          ". I haven't even read " +
          book +
          " yet.";
        break;

      case "Dorothy Dunnett":
      case "Dunnett":
      case "dunnett":
      case "dorothy dunnett":
      case "The Lymond Chronicles":
      case "the lymond chronicles":
      case "Lymond Chronicles":
      case "lymond chronicles":
      case "lymond":
      case "Lymond":
        text = "Nice try Klaus. Klaus loves " + book + ".";
        break;
      case "senlin":
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
        break;
      case "Bees":
      case "bees":
        text = "I knew I was going to get" + book + ", every time!";
        break;
      case "no bees":
      case "no Bees":
      case "No Bees":
        text = "Well good, " + book + " was what I started with.";
        break;
      case "Discworld":
      case "discworld":
      case "disc world":
      case "Disc world":
      case "Disc World":
      case "disc World":
        text = "You should all be reading " + book + ". It is incredible.";
        break;
      case "the faithful and the fallen":
      case "The Faithful and the Fallen":
      case "faithful and the fallen":
      case "FatF":
      case "fatf":
      case "Malice":
      case "Valour":
      case "Valor":
      case "Ruin":
      case "Wrath":
      case "John Gwynne":
      case "john gwynne":
      case "Gwynne":
      case "gwynne":
        text = "You should all be reading " + book + ". Go get em' Corban!";
        break;

      default:
        text = "You should all be reading " + book + ".";
        break;
    }

    msg.channel.send(text);
  }
};
