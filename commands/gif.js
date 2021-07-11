require('dotenv').config();
const fetch = require("node-fetch");

module.exports = async function (msg, args) {
    let keyword = args.join();
    SendGIF(keyword, msg.channel);
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
