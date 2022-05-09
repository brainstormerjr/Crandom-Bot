const GenerateRandomChampion = require("./generateRandomChampion.js");

module.exports = async function(msg, args) {
  let reply = await GenerateRandomChampion();
  msg.channel.send(reply);
};
