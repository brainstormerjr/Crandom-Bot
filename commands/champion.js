const GenerateChampInfo = require("./GenerateChampInfo.js");

module.exports = async function (msg, args) {
    let champion = args[0];
    let reply = await GenerateChampInfo(champion);
    msg.channel.send(reply);
}
