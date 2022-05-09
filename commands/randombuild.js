const GenerateRandomBuild = require("./generateRandomBuild.js");

module.exports = async function(msg, args) {
  let reply = await GenerateRandomBuild();
  msg.channel.send(reply);
};
