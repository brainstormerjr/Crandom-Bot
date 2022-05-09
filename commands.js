// import fetch and file system
const fetch = require("node-fetch");
const fs = require("fs");

// a list of all the commands, each corresponding to a javascript file
const hangeprefix = require("./commands/changeprefix.js");
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
const dictionary = require("./commands/dictionary.js");
const help = require("./commands/help.js");
const ollectsnowball = require("./commands/collectsnowball.js");
const throwsnowball = require("./commands/throwsnowball.js");
const snowballstats = require("./commands/snowballStats.js");

// common contains a bunch of common variables such as streams and connections
const common = require("./commands/common.js");

// a command lookup table (has to match with the list above)
const commands = {
  hangeprefix,
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
  random,
  dictionary,
  help,
  ollectsnowball,
  throwsnowball,
  snowballstats
};

// the exported function recieves a message
module.exports = async function(msg) {
  //if (msg.channel.id == '789096789848096788') { // in case we want to limit it to a particular server
  let tokens = msg.content.split(" "); // split up the message into chunks separated by a space
  let command = tokens.shift(); // remove the first word (contains the prefix and command)
  if (command.startsWith(common.prefix)) {
    // if the message starts with the prefix, execute a command
    command = command.substring(common.prefix.length); // the command is the first word, but removing the prefix
    if (command in commands) commands[command](msg, tokens); // if the command exists, call the function with the parameters
  }
  //}
};
