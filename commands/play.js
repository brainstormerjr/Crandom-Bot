const PlayYTVideo = require("./playYTVideo.js");


module.exports = async function (msg, args) {
    if (msg.member.voice.channel) {
        let link = args[0];
        PlayYTVideo(link, msg.channel, msg.member.voice.channel);
    } else {
        msg.channel.send('You have to be in a voice channel to use the command play ;)');
    }
}
