// generates the song queue text

// needed to get the titleQueue array
const common = require("./common.js");

// the exported function
module.exports = function() {
  let reply = "**QUEUE:**\n"; // the queue title in the reply
  for (let i = 0; i < common.titleQueue.length; i++) {
    // loop through the titles
    reply += `> ${i + 1}: ${common.titleQueue[i]}\n`; // add the title of the video to the message
  }
  return reply; // return the message
};
