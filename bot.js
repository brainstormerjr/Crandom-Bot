// invite link: https://discord.com/oauth2/authorize?client_id=789096420636098570&scope=bot

console.log("beep boop");

// import all the required modules
const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const fs = require("fs");
const ytdl = require("ytdl-core");
require("dotenv").config();

// login using the encrypted bot token in the .env file
client.login(process.env.BOTTOKEN);

// when the bot is ready/online, console log
client.on("ready", () => {
  console.log("beep boop im online <3");
});

// ping the project page every 4 minutes to keep the bot active on glitch
setInterval(async () => {
  await fetch("https://crandom-bot.glitch.me/").then(console.log("Pinged!"));
}, 240000);

// the commands file contains a command handler that handles all commands
const commandHandler = require("./commands");

// when there is a message sent to the discord server, call the command handler
client.on("message", commandHandler);
