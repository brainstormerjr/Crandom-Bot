const common = require("./common.js");
const fs = require('fs');

module.exports = async function () {
    let url = `http://ddragon.leagueoflegends.com/cdn/${common.patch}/data/en_US/summoner.json`;
    let response = fs.readFileSync("rune.json", "utf8");
    let json = await JSON.parse(response);
    let treeNames = Object.keys(json);
    let primaryTree = treeNames[Math.floor(Math.random() * (treeNames.length - 1))];
    let secondaryTree;
    do {
        secondaryTree = treeNames[Math.floor(Math.random() * (treeNames.length - 1))];
    } while (primaryTree == secondaryTree);
    let runes = ["", [], [], []];
    runes[0] = json[primaryTree][0][Math.floor(Math.random() * json[primaryTree][0].length)];
    for (let i = 1; i < 4; i++) {
        runes[1].push(json[primaryTree][i][Math.floor(Math.random() * json[primaryTree][i].length)]);
    }
    branch1 = Math.floor(Math.random() * 3) + 1;
    do {
        branch2 = Math.floor(Math.random() * 3) + 1;
    } while (branch1 == branch2);
    runes[2].push(json[secondaryTree][branch1][Math.floor(Math.random() * json[secondaryTree][branch1].length)]);
    runes[2].push(json[secondaryTree][branch2][Math.floor(Math.random() * json[secondaryTree][branch2].length)]);
    for (let i = 0; i < 3; i++) {
        runes[3].push(json["Shards"][i][Math.floor(Math.random() * json["Shards"][i].length)]);
    }

    let msg = "**Runes:**\n\n";
    msg += `**Keystone:**\n> ${runes[0]}\n\n`;
    msg += `**Primary Tree:**\n> ${runes[1][0]}\n> ${runes[1][1]}\n> ${runes[1][2]}\n\n`;
    msg += `**Secondary Tree:**\n> ${runes[2][0]}\n> ${runes[2][1]}\n\n`;
    msg += `**Rune Stats:**\n> ${runes[3][0]}\n> ${runes[3][1]}\n> ${runes[3][2]}\n\n`;

    return msg;
}
