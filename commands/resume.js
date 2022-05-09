const common = require("./common");

module.exports = function(msg, args) {
  if (common.dispatcher) {
    common.dispatcher.resume();
  }
};
