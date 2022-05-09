// changes the bot prefix to the chosen string

// we will need the prefix variable in common
const common = require("./common.js");

// the exported function
module.exports = function(msg, args) {
  common.prefix = args.join(" "); // join all the arguments together for prefixes with a space and set it to common.prefix
  msg.channel.send("The prefix is now " + common.prefix); // send a message to notify the change
};
