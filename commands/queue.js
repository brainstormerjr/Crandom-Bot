const GenerateQueue = require("./generateQueue.js");
const common = require("./common.js");
const ytdl = require("ytdl-core");

module.exports = async function (msg, args) {
    if (msg.member.voice.channel) {
        link = args[0];
        QueueLink(link, msg.channel, msg.member.voice.channel);
    } else {
        msg.channel.send('You have to be in a voice channel to use the command queue ;)');
    }
}

async function QueueLink(link, channel) {
    common.queue.push(link);
    let detailStream = ytdl(link);
    detailStream.on("info", (info) =>  {
        common.titleQueue.push(info.videoDetails.title);
        detailStream.destroy();
        channel.send(GenerateQueue());
    });
}
