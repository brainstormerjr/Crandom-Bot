const common = require("./common.js");
const fetch = require('node-fetch');

module.exports = async function () {
    let url = `http://ddragon.leagueoflegends.com/cdn/${common.patch}/data/en_US/item.json`;
    let response = await fetch(url);
    let json = await response.json();
    let itemCodes = Object.keys(json.data);
    let mythics = [];
    let boots = [];
    let items = [];
    if (itemCodes != null) {
        for (let i = 0; i < itemCodes.length; i++) {
            let item = json.data[itemCodes[i]];
            if (item.maps["11"] && !("requiredAlly" in item)) { // Available in summoners rift and ornn not required
                if (item.description.includes("Mythic")) { // Mythic item
                    mythics.push(item.name);
                } else if (item.tags.includes("Boots") && item.name != "Boots" && item.name != "Slightly Magical Footwear") { // Boots
                    boots.push(item.name);
                } else if (!("into" in item) && item.gold.total > 1000) { // Doesn't build and costs more
                    items.push(item.name);
                }
            }
        }
    }
    let chosenIndices = [];
    let build = [];
    let index = Math.floor(Math.random() * mythics.length);
    build.push(mythics[index]);
    index = Math.floor(Math.random() * boots.length);
    build.push(boots[index]);
    for (let i = 0; i < 6; i++){
        let index;
        do {
            index = Math.floor(Math.random() * items.length);
        } while (chosenIndices.includes(index));
        chosenIndices.push(index);
        build.push(items[index]);
    }
    let buildText = "";
    buildText += `**Core items:** \n> ${build[0]} \n> ${build[1]} \n> ${build[2]}\n\n`;
    buildText += `**Late-game choices:** \n> ${build[3]} \n> ${build[4]} \n> ${build[5]} \n> ${build[6]} \n> ${build[7]}\n\n`;
    return buildText;
}
