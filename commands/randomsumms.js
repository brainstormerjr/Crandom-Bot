const GenerateRandomSumms = require("./generateRandomSumms.js");

module.exports = async function(msg, args) {
  let reply = await GenerateRandomSumms();
  msg.channel.send(reply);
};
