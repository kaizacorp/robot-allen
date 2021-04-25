module.exports = async function (msg, tokens) {
  if (tokens.length < 2) {
    msg.channel.send("Robot Allen requires at least two (or more) choices");
  } else {
    let index = Math.floor(Math.random() * tokens.length);
    let book = tokens[index].replace(/["“”]+/g, "");
    let text = "";

    switch (book.toLowerCase()) {
      case "acomaf":
      case "acotar":
      case "acosf":
      case "sjm":
      case "maas":
        text = "You should all be reading " + book + ". I feel it in my bones!";
        break;
      case "lotr":
      case "lord of the rings":
      case "fellowship of the ring":
      case "the two towers":
      case "two towers":
      case "the return of the king":
      case "return of the king":
      case "the hobbit":
        text =
          "You should all be reading " +
          book +
          ". I haven't even read " +
          book +
          " yet.";
        break;

      case "dunnett":
      case "dorothy dunnett":
      case "the lymond chronicles":
      case "lymond chronicles":
      case "lymond":
        text = "Nice try Klaus. Klaus loves " + book + ".";
        break;
      case "senlin":
      case "senlin ascends":
      case "aots":
      case "arm of the sphinx":
      case "hod king":
      case "the hod king":
      case "thk":
        text = "How bout' dem Senlin books?! I love " + book;
        break;
      case "bees":
        text = "I knew I was going to get" + book + ", every time!";
        break;
      case "no bees":
        text = "Well good, " + book + " was what I started with.";
        break;
      case "discworld":
      case "disc world":
        text = "You should all be reading " + book + ". It is incredible.";
        break;
      case "the faithful and the fallen":
      case "faithful and the fallen":
      case "fatf":
      case "malice":
      case "valour":
      case "valor":
      case "ruin":
      case "wrath":
      case "john gwynne":
      case "gwynne":
        text = "You should all be reading " + book + ". Go get em' Corban!";
        break;
      case "yes":
        text = "Yes.";
        break;
      case "no":
        text = "No.";
        break;
      case "allen":
        text = "Haaaave you met " + book + "?";
        break;

      default:
        text = "You should all be reading " + book + ".";
        break;
    }

    msg.channel.send(text);
  }
};
