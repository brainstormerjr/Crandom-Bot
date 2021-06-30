const common = require("./common");

module.exports = async function (msg, args) {
    if (msg.member.voice.channel) {
        JoinChannel(msg.member.voice.channel);
    }
    else
    {
        msg.channel.send('You have to be in a voice channel to use the command join ;)');
    }
}

async function JoinChannel(channel) {
    common.voiceChannelConnection = await channel.join();
}
