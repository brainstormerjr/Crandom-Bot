// generates a random build (random items) from Riot's Data Dragon

// import required modules
const common = require("./common.js"); // for the patch number
const fetch = require("node-fetch"); // to fetch from data dragon

// the exported function
module.exports = async function() {
  let url = `http://ddragon.leagueoflegends.com/cdn/${common.patch}/data/en_US/item.json`; // generate the url to get the items json
  let response = await fetch(url); // wait for the json fetch
  let json = await response.json(); // wait for the json to parse

  let itemCodes = Object.keys(json.data); // the codes of the items (eg. 1001) are the keys of json.data
  let mythics = []; // an array of all the mythic items
  let boots = []; // an array of all the boots
  let items = []; // an array of al the items (that can be purchased in summoner's rift)
  if (itemCodes != null) {
    // if we got the items
    for (let i = 0; i < itemCodes.length; i++) {
      // loop through every item code
      let item = json.data[itemCodes[i]];
      if (item.maps["11"] && !("requiredAlly" in item)) {
        // this item is available in summoner's rift (map 11), and not an Ornn item
        if (item.description.includes("Mythic")) {
          // this item description contains mythic, is a mythic item
          mythics.push(item.name); // add to the mythic array
        } else if (
          item.tags.includes("Boots") &&
          item.name != "Boots" &&
          item.name != "Slightly Magical Footwear"
        ) {
          // boots
          boots.push(item.name); // add to the boots array
        } else if (!("into" in item) && item.gold.total > 1000) {
          // doesn't build into another item, and the item costs a lot
          items.push(item.name); // add to the items array (is a legendary item)
        }
      }
    }
  }
  let chosenIndices = []; // a list of chosen indices to make sure we don't repeat legendary items
  let build = []; // the final build (0: mythic, 1: boot, 2-7: legendary items) 8 items total
  let index = Math.floor(Math.random() * mythics.length); // randomize a mythic index
  build.push(mythics[index]); // add the chosen mythic
  index = Math.floor(Math.random() * boots.length); // randomize a boot index
  build.push(boots[index]); // add the chosen boots
  for (let i = 0; i < 6; i++) {
    // generate 6 legendary items
    let index;
    do {
      index = Math.floor(Math.random() * items.length); // randomize a legendary index
    } while (chosenIndices.includes(index)); // keep generating until the index has not been chosen before
    chosenIndices.push(index); // add the chosen index to the chosen indices
    build.push(items[index]); // add the item to the build
  }
  let buildText = ""; // the message
  // the core items (mythic, boot, and 1 legendary)
  buildText += `**Core items:** \n> ${build[0]} \n> ${build[1]} \n> ${
    build[2]
  }\n\n`;
  // the late game choices (5 mythics, user gets to choose 3)
  buildText += `**Late-game choices:** \n> ${build[3]} \n> ${build[4]} \n> ${
    build[5]
  } \n> ${build[6]} \n> ${build[7]}\n\n`;
  return buildText; // return the text
};
