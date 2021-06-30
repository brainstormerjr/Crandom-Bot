const GenerateChampInfo = require("./generateChampInfo.js");
const GenerateRandomChampion = require("./generateRandomChampion.js");
const GenerateRandomSumms = require("./generateRandomSumms.js");
const GenerateRandomBuild = require("./generateRandomBuild.js");
const GenerateRandomRunes = require("./generateRandomRunes.js");

module.exports = async function (msg, args) {
    let reply = "**-----------------" + msg.author.username.toUpperCase() + "'S UPCOMING GAME-----------------**\n\n";
    let champName = await GenerateRandomChampion();
    reply += await GenerateChampInfo(champName);
    msg.channel.send(reply);
    reply = "\n-------------------------------------------------------------------\n\n";
    reply += await GenerateRandomBuild();
    reply += "-------------------------------------------------------------------\n\n";
    reply += await GenerateRandomRunes();
    reply += "-------------------------------------------------------------------\n\n";
    reply += await GenerateRandomSumms();
    msg.channel.send(reply);
}
