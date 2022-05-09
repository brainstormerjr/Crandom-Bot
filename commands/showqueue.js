const GenerateQueue = require("./generateQueue.js");

module.exports = function(msg, args) {
  msg.channel.send(GenerateQueue());
};
