const common = require("./common.js");

module.exports = function (msg, args) {
    common.prefix = args.join(" ");
    msg.channel.send('The prefix is now ' + common.prefix);
}
