const common = require("./common.js"); // to get snowball info

module.exports = async function(msg, args) {
  let target; // The person to get the snowball info on
  
  if (msg.mentions.users.size == 0) { // If the sender didn't mention anyone, just get the sender's information
    target = msg.author;
  } else { // If the sender mentioned someone, get the first mentioned person's information
    target = msg.mentions.users.first();
  }
  
  let username = target.username; // The user's username
  
  if (!(username in common.snowballInfo)) { // The user has never used this bot before
    common.snowballInfo[username] = {"hits": 0, "misses": 0, "gotHit": 0, "snowballs":0, "canCollect": true}; // Initialize a new user
  }
  let u = common.snowballInfo[username];
  // Send the user's stats
  msg.channel.send(`**${target}'S SNOWBALL STATS**\n HITS: ${u["hits"]}\n MISSES: ${u["misses"]}\n GOT HIT: ${u["gotHit"]}\n SNOWBALLS: ${u["snowballs"]}`);
}