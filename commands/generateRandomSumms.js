const common = require("./common.js");
const fetch = require('node-fetch');

module.exports = async function () {
    let url = `http://ddragon.leagueoflegends.com/cdn/${common.patch}/data/en_US/summoner.json`;
    let response = await fetch(url);
    let json = await response.json();
    let rawSpells = Object.keys(json.data);
    let spells = [];
    if (rawSpells != null) {
        for (let i = 0; i < rawSpells.length; i++) {
            if (json.data[rawSpells[i]].modes.includes("CLASSIC")) {
                spells.push(json.data[rawSpells[i]].name);
            }
        }
    }
    let chosenSpells = [];
    let chosenIndices = [];
    for (let i = 0; i < 2; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * spells.length);
        } while (chosenIndices.includes(index));
        chosenIndices.push(index);
        chosenSpells.push(spells[index]);
    }
    if (!chosenSpells.includes("Smite")) {
        let smiteIndex = Math.floor(Math.random() * 2);
        chosenSpells[smiteIndex] += " / Smite";
    }
    let msg = "";
    msg += `**Summoner spells:**\n`;
    msg += `> ${chosenSpells[0]} on D \n> ${chosenSpells[1]} on F`;
    return msg;
}
