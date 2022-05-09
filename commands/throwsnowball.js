const common = require("./common.js"); // to update snowball info

module.exports = async function(msg, args) {
  let thrower = msg.author.username; // The thrower's username is saved
  //let target = args[0]; // The target is given by the argument of the command
  let mentions = msg.mentions.users;
  
  if (mentions.size == 1) { // If exactly one person was mentioned
    let target = mentions.first(); // The target is the first (and only) person in the mentions list
    let targetName = target.username; // Save the username of the target
    if (Math.random() < 0.3) { // 30% snowball hitrate
      if (!(thrower in common.snowballInfo)) { // If the thrower has never used the snowball portion of the bot
        common.snowballInfo[thrower] = {"hits": 0, "misses": 0, "gotHit": 0, "snowballs":0, "canCollect": true}; // Initialize new user
      }
      if (common.snowballInfo[thrower]["snowballs"] > 0) { // If the player has snowballs to throw
        common.snowballInfo[thrower]["snowballs"] -= 1; // Decrease number of snowballs
        common.snowballInfo[thrower]["hits"] += 1; // Increase number of hits
        if (!(targetName in common.snowballInfo)) { // If the target has never used the snowball portion of the bot
          common.snowballInfo[targetName] = {"hits": 0, "misses": 0, "gotHit": 0, "snowballs":0, "canCollect": true}; // Initialize new user
        }
        common.snowballInfo[targetName]["gotHit"] += 1; // Increase number of got hits
        let reply = `WHAT A HIT! ${msg.author} hit ${target} in the face hard! \n${thrower} has landed ${common.snowballInfo[thrower]["hits"]} snowballs. \n${targetName} has been hit by ${common.snowballInfo[targetName]["gotHit"]} snowballs.`
        msg.channel.send(reply); // Say something about the throw!
      } else {
        msg.channel.send(`${msg.author} you don't have any snowballs!`); // The player doesn't have any snowballs
      }
    } else {
      if (!(thrower in common.snowballInfo)) { // The thrower has never used the snowball portion of the bot
        common.snowballInfo[thrower] = {"hits": 0, "misses": 0, "gotHit": 0, "snowballs":0, "canCollect": true}; // Initialize new user
      }
      if (common.snowballInfo[thrower]["snowballs"] > 0) { // The user has snowballs to throw
        common.snowballInfo[thrower]["snowballs"] -= 1; // Decrease number of snowballs
        common.snowballInfo[thrower]["misses"] += 1; // Increase number of misses
        let reply = `A HIT AND MISS! ${msg.author} you have missed ${common.snowballInfo[thrower]["misses"]} snowballs. Get better aim.`;
        msg.channel.send(reply); // Say something about the throw!
      } else {
        msg.channel.send(`${msg.author} you don't have any snowballs!`); // The player doesn't have any snowballs
      }
    }
  } else if (mentions.size == 0) { // The message didn't mention anyone (or only mentioned @everyone)
    msg.channel.send("Mention someone to throw a snowball at them!");
  } else { // the message mentioned multiple people (mentions.size > 1)
    msg.channel.send("You can't throw a snowball at multiple people >:(")
  }
}