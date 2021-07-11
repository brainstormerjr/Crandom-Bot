const common = require("./common.js");
const ytdl = require("ytdl-core");
const GenerateQueue = require("./generateQueue.js");

module.exports = async function (link, channel, voiceChannel) {
    if (!common.voiceChannelConnection) await JoinChannel(voiceChannel);
    let stream = ytdl(link);
    stream.on("info", (info) =>  {
        nowPlaying = info.videoDetails.title;
        let msg = `**NOW PLAYING**:\n> ${nowPlaying}\n\n`;
        msg += GenerateQueue();
        channel.send(msg);
    });
    stream.on("end", () => {
        if (queue.length > 0) {
            let link = queue.shift();
            common.nowPlaying = titleQueue.shift();
            PlayYTVideo(link, channel);
        } else {
            common.voiceChannelConnection.disconnect();
            common.voiceChannelConnection = null;
        }
    });
    common.dispatcher = common.voiceChannelConnection.play(stream);
    common.dispatcher.on('error', (msg) => {
        console.error(msg);
    });
}

async function JoinChannel(channel) {
    common.voiceChannelConnection = await channel.join();
}
