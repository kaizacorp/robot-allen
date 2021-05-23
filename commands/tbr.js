const validUrl = require("valid-url");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = async function (msg, tokens) {
  if (tokens.length === 1) {
    // check that it is a valid goodreads shelf URL (if not, tell the user)
    if (validUrl.isHttpsUri(tokens[0])) {
      let shelfUrl = tokens[0].match(
        /(https?:\/\/(.+?\.)?goodreads\.com\/review\/list\/[0-9a-zA-Z-]*\?shelf=[0-9a-zA-Z-]*(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/g
      )[0];
      if (!shelfUrl) {
        msg.channel.send("Robot Allen requires a valid goodreads shelf link!");
      }
      // attempt to crawl the page for titles + authors + covers
      try {
        const response = await fetch(shelfUrl);
        const body = await response.text();
        //-> might not get response from goodreads server, or no valid titles in shelf (empty shelf?)
        //console.log(body);
        // using cheerio, for each <tr> get the title + author (if not found, probably shelf link is private)
        //    -> store as array of Objects:
        //    [{title: 'A Game of Thrones', author: 'George R.R. Martin'}, ...]
        $ = cheerio.load(body);
        let raw = [];
        $("#booksBody > tr > td > div > a").each((index, element) => {
          let data = $(element).text();
          if (data != "0") {
            raw.push(data.split("\n").join("").trim().replace(/  +/g, " "));
          }
          //console.log($(element).text());
        });
        //console.log(raw);
        let combined = [];
        for (let i = 0; i < raw.length - 1; i += 2) {
          combined.push({ title: raw[i], author: raw[i + 1] });
        }
        //console.log(combined);
        // randomly select one of the titles from the array
        let index = Math.floor(Math.random() * combined.length);
        let choice = combined[index];
        console.log(choice);
        let title = choice.title;
        let author = choice.author;
        // send the title and author to discord channel (as embed?)
        msg.channel.send(title + "\n" + author);
      } catch (error) {
        console.log(error);
      }
    } else {
      msg.channel.send("Robot Allen requires a valid link with HTTPS");
    }
    return;
  } else if (tokens.length < 2) {
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
