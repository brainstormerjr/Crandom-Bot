// generates info on a league of legends champion using Riot's Data Dragon

// import the required modules
const common = require("./common.js"); // for patch number
const fetch = require("node-fetch"); // to fetch from data dragon

// the exported function
module.exports = async function(champion) {
  let displayName = champion; // the displayed name is the name the user searched for
  if (champion == "Wukong") champion = "MonkeyKing"; // the internal name of Wukong is MonkeyKing, change if necessary
  // the url of the champion json file
  let url = `http://ddragon.leagueoflegends.com/cdn/${common.patch}/data/en_US/champion/${champion}.json`;
  let response = await fetch(url); // wait for a response
  let json = await response.json(); // wait for the json to parse

  let msg = ""; // start with a blank message
  let spellKeys = ["Q", "W", "E", "R"]; // the 4 abilities are Q, W, E and R

  // add to message the champion title e.g. DRMUNDO: THE MADMAN OF ZAUN
  msg +=
    "**" +
    displayName.toUpperCase() +
    ": " +
    json.data[champion].title.toUpperCase() +
    "**\n\n";

  // add passive info
  let passive = json.data[champion].passive;
  msg += "**Passive: " + passive.name + "**\n"; // add passive name
  let passiveDescription = passive.description.replace(/<br><br>/g, "\n> "); // replace double line breaks with a newline
  passiveDescription = passiveDescription.replace(/<br>/, ""); // replace remaining line breaks with nothing
  passiveDescription = passiveDescription.replace(/<[^<>]{0,}>/g, ""); // replace all <> tags with nothing
  msg += "> " + passiveDescription + "\n\n"; // add passive description

  // loop through each of the four abilities (0: Q, 1: W, 2: E, 3: R)
  for (let i = 0; i < 4; i++) {
    let ability = json.data[champion].spells[i];
    msg += "**" + spellKeys[i] + ": " + ability.name + "**" + "\n"; // add ability name
    msg += "> ***Cooldown: " + ability.cooldownBurn + "     Cost: "; // add cooldown burn

    // generate the cost burn
    let resource = ability.resource; // get the resource expression for the ability
    let regExp = /{{([^}]+)}}/g; // the regular expression for {{ any text in double curly brackets }}
    let matches = resource.match(regExp); // all regex matches
    if (matches != null) {
      // got at least 1 match
      for (let i = 0; i < matches.length; i++) {
        // loop through each match
        name = matches[i];
        if (name.includes("cost")) {
          // {{ cost }}
          resource = resource.replace("{{ cost }}", ability.costBurn); // replace with the cost burn
        } else if (name.includes("abilityresourcename")) {
          // {{ abilityresourcename }}
          // replace with their "partype" eg. "mana" or "energy"
          resource = resource.replace(
            "{{ abilityresourcename }}",
            json.data[champion].partype
          );
        } else if (name.includes(" e")) {
          // {{ eN }} where N is an index in the effect burn array
          let index = parseInt(name[4]); // get the index
          resource = resource.replace(/{{ e. }}/, ability.effectBurn[index]); // replace with the effect burn value
        }
      }
    }
    resource = resource.replace(/\([^()]+\)/, ""); // replace everything in (brackets) with nothing
    msg += resource + "***\n"; // add the resource text to the message

    // generate the description
    let description = ability.description.replace(/<br><br>/g, "\n> "); // replace double line breaks with a newline
    description = description.replace(/<br>/, ""); // replace remaining line breaks with nothing
    description = description.replace(/<[^<>]{0,}>/g, ""); // replace all <> tags with nothing
    msg += "> " + description + "\n\n"; // add the ability description
  }
  return msg; // return the message
};
