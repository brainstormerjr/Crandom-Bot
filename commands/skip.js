const common = require("./common");
const PlayYTVideo = require("./playYTVideo.js");

module.exports = async function(msg, args) {
  if (common.queue.length > 0) {
    let link = common.queue.shift();
    PlayYTVideo(link, msg.channel);
  } else {
    common.voiceChannelConnection.disconnect();
    common.voiceChannelConnection = null;
  }
};
