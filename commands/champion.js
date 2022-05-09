// sends the champion info to the channel

// we will need the generateChampInfo function
const GenerateChampInfo = require("./generateChampInfo.js");

// the exported function
module.exports = async function(msg, args) {
  let champion = args[0]; // the first argument (should be the only argument) is the champion name
  let reply = await GenerateChampInfo(champion); // generate the champion data
  msg.channel.send(reply); // send the champion info
};
