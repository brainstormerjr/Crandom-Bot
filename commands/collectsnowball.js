const common = require("./common.js"); // to update snowball info

module.exports = async function(msg, args) {
  let username = msg.author.username; // The collector's username
  
  if (username in common.snowballInfo) { // The user has used this bot before
    if (common.snowballInfo[username]["canCollect"]) { // The user is allowed to collect a snowball
      common.snowballInfo[username]["snowballs"] += 1; // Increase number of snowballs
      common.snowballInfo[username]["canCollect"] = false; // The user cannot collect another snowball for now
      msg.channel.send(`${msg.author} collected a snowball. He now has ${common.snowballInfo[username]["snowballs"]} snowballs!`); // Send a message
      await new Promise(resolve => setTimeout(resolve, 30000)); // The user can collect a snowball every 30 seconds, wait 30 seconds and revert canCollect
      common.snowballInfo[username]["canCollect"] = true;
    } else {
      msg.channel.send(`${msg.author} you have to wait 30 seconds before you can collect another snowball.`); // Tell the user you can't collect a snowball
    }
  } else {
    common.snowballInfo[username] = {"hits": 0, "misses": 0, "gotHit": 0, "snowballs":0, "canCollect": true}; // Initialize a new user
    common.snowballInfo[username]["snowballs"] += 1; // Increase number of snowballs
    common.snowballInfo[username]["canCollect"] = false; // The user cannot collect another snowball for now
    msg.channel.send(`${msg.author} collected a snowball. He now has ${common.snowballInfo[username]["snowballs"]} snowballs!`); // Send a message
      await new Promise(resolve => setTimeout(resolve, 5000)); // The user can collect a snowball every 30 seconds, wait 30 seconds and revert canCollect
      common.snowballInfo[username]["canCollect"] = true;
  }
}