const validUrl = require("valid-url");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = async function (msg, tokens) {
  if (tokens.length === 1) {
    // check that it is a valid goodreads/storygraph shelf URL (if not, tell the user)
    if (validUrl.isHttpsUri(tokens[0])) {
      let goodreadsUrl = tokens[0].match(
        /(https?:\/\/(.+?\.)?goodreads\.com\/review\/list\/[0-9a-zA-Z-]*\?shelf=[0-9a-zA-Z-]*(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/g
      );
      let storygraphUrl = tokens[0].match(
        /(https?:\/\/(.+?\.)?thestorygraph\.com\/tags\/[0-9a-zA-Z-]*(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/g
      );
      if (!goodreadsUrl && !storygraphUrl) {
        msg.channel.send(
          "Robot Allen requires a valid goodreads or storygraph shelf link!"
        );
      }
      // attempt to crawl the goodreads page for titles + authors
      if (goodreadsUrl) {
        try {
          const response = await fetch(
            goodreadsUrl[0] + "&per_page=100&sort=random"
          );
          const body = await response.text();
          $ = cheerio.load(body);
          let raw = [];
          $("#booksBody > tr > td > div > a").each((index, element) => {
            let data = $(element).text();
            if (data.length > 1) {
              raw.push(data.split("\n").join("").trim().replace(/  +/g, " "));
            }
          });
          if (raw.length === 0) {
            msg.channel.send(
              "That goodreads link didn't work...your account might need to be set to `public`"
            );
            return;
          }
          let combined = [];
          for (let i = 0; i < raw.length - 1; i += 2) {
            combined.push({ title: raw[i], author: raw[i + 1] });
          }
          let index = Math.floor(Math.random() * combined.length);
          let choice = combined[index];
          msg.channel.send("**" + choice.title + "**" + " by " + choice.author);
        } catch (error) {
          console.log(error);
        }
      }
      if (storygraphUrl) {
        try {
          const response = await fetch(storygraphUrl[0]);
          const body = await response.text();
          $ = cheerio.load(body);
          let raw = [];
          $(".book-title-author-and-series").each((index, element) => {
            let data = $(element).text();
            if (data != "0") {
              raw.push(data.split("\n").join("").trim().replace(/  +/g, " "));
            }
          });
          if (raw.length === 0) {
            msg.channel.send(
              "That storygraph link didn't work...it might need to be set to `public`"
            );
            return;
          }
          let index = Math.floor(Math.random() * raw.length);
          let choice = raw[index];
          msg.channel.send(choice);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      msg.channel.send("Robot Allen requires a valid link with HTTPS");
    }
    return;
  } else if (tokens.length < 2) {
    msg.channel.send(
      "Robot Allen requires at least two choices or a valid GoodReads/Storygraph URL"
    );
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
