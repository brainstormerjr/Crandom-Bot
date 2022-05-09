const common = require("./common");

module.exports = async function(msg, args) {
  if (common.voiceChannelConnection) {
    common.voiceChannelConnection.disconnect();
    common.voiceChannelConnection = null;
  }
};
