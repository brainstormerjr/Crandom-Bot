const common = require("./common.js");

module.exports = function () {
    let reply = "**QUEUE:**\n";
    for (let i = 0; i < common.titleQueue.length; i++) {
        reply += `> ${i+1}: ${common.titleQueue[i]}\n`;
    }
    return reply;
}
