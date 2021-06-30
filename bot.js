// https://discord.com/oauth2/authorize?client_id=789096420636098570&scope=bot

console.log('beep boop');

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const fs = require('fs');
const ytdl = require('ytdl-core');
require('dotenv').config();

client.login(process.env.BOTTOKEN);

client.on('ready', () => {
    console.log("beep boop im online <3");
});

const commandHandler = require("./commands");



client.on('message', commandHandler);
