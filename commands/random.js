const GenerateChampInfo = require("./generateChampInfo.js");
const GenerateRandomChampion = require("./generateRandomChampion.js");
const GenerateRandomSumms = require("./generateRandomSumms.js");
const GenerateRandomBuild = require("./generateRandomBuild.js");
const GenerateRandomRunes = require("./generateRandomRunes.js");

module.exports = async function(msg, args) {
  if (args.length == 0) {
    let reply =
      "**-----------------" +
      msg.author.username.toUpperCase() +
      "'S UPCOMING GAME-----------------**\n\n";
    let champName = await GenerateRandomChampion();
    reply += await GenerateChampInfo(champName);
    msg.channel.send(reply);
    reply =
      "\n-------------------------------------------------------------------\n\n";
    reply += await GenerateRandomBuild();
    reply +=
      "-------------------------------------------------------------------\n\n";
    reply += await GenerateRandomRunes();
    reply +=
      "-------------------------------------------------------------------\n\n";
    reply += await GenerateRandomSumms();
    msg.channel.send(reply);
  }
  else {
    let newArray = Shuffle(args);
    let randomIndex = Math.floor(Math.random() * newArray.length);
    let reply = '**Random order:**\n```';
    for (let i = 0; i < newArray.length; i++) {
      reply += `${newArray[i]}   `;
    }
    reply = reply.slice(0, -3);
    reply += '```\n\n**Random item:**\n```' + newArray[randomIndex] + '```';
    msg.channel.send(reply);
  }
};

// Shuffle algorithm link: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function Shuffle(array) {
  let currentIndex = array.length, randomIndex; // 2 integers, a sorting index/current index and a random index
  
  while (currentIndex != 0) { // while there are still cards to shuffle
    randomIndex = Math.floor(Math.random() * currentIndex); // get a random index from 0 (inclusive) to the current index (exclusive)
    currentIndex--; //decrease the current index
    
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; // swap the 2 elements
  }
  
  return array;
}
