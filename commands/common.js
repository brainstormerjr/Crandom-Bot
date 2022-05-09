const fetch = require("node-fetch"); // to fetch the newest patch
const fs = require("fs"); // to get locally stored snowball info

// get the newest patch number
let patchURL = `https://ddragon.leagueoflegends.com/api/versions.json`;

// Get the newest patch number
async function getNewPatch() {
  let response = await fetch(patchURL); // fetch from data dragon the patch numbers
  let json = await response.json(); // parse the json
  exportObject.patch = json[0]; // get the newest patch number (at index 0)
}

async function getSnowballInfo() {
  let response = fs.readFileSync("snowballInfo.json", "utf8"); // read the snowballInfo.json folder
  console.log(response);
  let json = await JSON.parse(response); // wait for the json to parse
  exportObject.snowballInfo = json; // "load" the snowball info into common
}


// the common variables needed in multiple files
let exportObject = {
  prefix: "c", // the bot prefix
  voiceChannelConnection: null, // a connection to a particular voice channel
  dispatcher: null, // a dispatcher playing music to a voice channel
  queue: [], // the music player queue
  titleQueue: [], // the titles of the songs in queue
  nowPlaying: "", // the title of the song currently playing
  patch: "", // the current league of legends patch
  snowballInfo: {} // the snowball info within the app
};

// set the exported values
module.exports = exportObject;

getNewPatch(); // get the newest patch
getSnowballInfo(); // load the snowball info

// write the snowball info in the application to the json file every 10 seconds
setInterval(() => {
  //exportObject.snowballInfo['testUser'] += 5;
  let snowballInfoString = JSON.stringify(exportObject.snowballInfo);
  fs.writeFileSync('snowballInfo.json', snowballInfoString, 'utf8', (err) => {
    if (err) console.error(err);
  });
  // console.log(snowballInfoString);
}, 10000);
