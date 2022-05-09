// generates a random champion from Riot's Data Dragon

// import the required modules
const common = require("./common.js"); // for the patch number
const fetch = require("node-fetch"); // to fetch data from Riot's Data Dragon

// the exported funcion
module.exports = async function() {
  let url = `http://ddragon.leagueoflegends.com/cdn/${common.patch}/data/en_US/champion.json`; // generate the json link to champion list
  let response = await fetch(url); // wait to fetch json
  let json = await response.json(); // wait for json to parse

  let champions = Object.keys(json.data); // the champions are the keys in the json.data object
  if (champions != null) {
    // if we got the list of champions successfully
    let champIndex = Math.floor(Math.random() * champions.length); // randomize a champion index
    let champName = champions[champIndex]; // get the champion name
    if (champName == "MonkeyKing") champName = "Wukong"; // replace MonkeyKing with Wukong
    return champName; // return the champion name
  }
};
