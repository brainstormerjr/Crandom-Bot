const GenerateRandomRunes = require("./generateRandomRunes.js");

module.exports = async function (msg, args) {
    let reply = await GenerateRandomRunes();
    msg.channel.send(reply);
}
