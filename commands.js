const fetch = require('node-fetch');
const fs = require('fs');

const changeprefix = require("./commands/changeprefix.js");
const join = require("./commands/join.js");
const leave = require("./commands/leave.js");
const gif = require("./commands/gif.js");
const play = require("./commands/play.js");
const queue = require("./commands/queue.js");
const pause = require("./commands/pause.js");
const resume = require("./commands/resume.js");
const skip = require("./commands/skip.js");
const showqueue = require("./commands/showqueue.js");
const hampion = require("./commands/champion.js");
const randomchampion = require("./commands/randomchampion.js");
const randombuild = require("./commands/randombuild.js");
const randomsumms = require("./commands/randomsumms.js");
const randomrunes = require("./commands/randomrunes.js");
const random = require("./commands/random.js");

const common = require("./commands/common.js");

const commands = {
    changeprefix,
    join,
    leave,
    gif,
    play,
    queue,
    pause,
    resume,
    skip,
    showqueue,
    hampion,
    randomchampion,
    randombuild,
    randomsumms,
    randomrunes,
    random
};

module.exports = async function (msg) {
    //if (msg.channel.id == '789096789848096788') {
        let tokens = msg.content.split(" ");
        let command = tokens.shift();
        if (command.startsWith(common.prefix)) {
            command = command.substring(common.prefix.length);
            commands[command](msg, tokens);
        }
    //}
}




async function SendGIF(keyword, channel) {
    let url = `https://api.tenor.com/v1/search?q=${keyword}&key=${process.env.TENORKEY}&limit=8`;
    let response = await fetch(url);
    let json = await response.json();
    if (json.results.length > 0) {
        let index = Math.floor(Math.random() * json.results.length);
        channel.send(json.results[index].url);
    } else {
        channel.send("Couldn't find what you were looking for :( sorry senpai");
    }
}



async function SendRandomBuild(channel) {

}

async function SendRandomSumms(channel) {
    let reply = await GenerateRandomSumms();
    channel.send(reply);
}

async function SendRandomRunes(channel) {

}
