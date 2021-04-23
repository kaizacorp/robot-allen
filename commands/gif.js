const fetch = require("node-fetch");

let recentGifID = [];
module.exports = async function (msg) {
  //if (!msg.guild) return; //no PMing the bot for gifs, must be in a public server
  try {
    //let tenorURL = `https://api.tenor.com/v1/search?q=allenxandria&key=${process.env.TENORKEY}&limit=50`;
    let tenorURL = `https://g.tenor.com/v1/random?q=allenxandria&key=${process.env.TENORKEY}&limit=50`;
    let response = await fetch(tenorURL);
    let json = await response.json();
    let index = Math.floor(Math.random() * json.results.length);
    /* Code to prevent repetitions... but also causing weird exceptions? Embrace true random? Trust tenor?
    let uniqueAttempts = 0;
    while (recentGifID.includes(json.results[index].id)) {
      uniqueAttempts += 1;
      //console.log("Repeat detected! Stop the madness!", json.results[index].id);
      index = Math.floor(Math.random() * json.results.length);
    }
    recentGifID.push(json.results[index].id);
    if (recentGifID.length >= 25) {
      if (recentGifID) {
        recentGifID.shift();
      }
    }
    //console.log(recentGifID);
    console.log(uniqueAttempts);
   */

    msg.channel.send(json.results[index].url);
  } catch (error) {
    console.log(error);
  }
};
