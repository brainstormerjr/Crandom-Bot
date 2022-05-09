const fetch = require("node-fetch");

module.exports = async function(msg, args) {
  let word, language;
  language = "en_US";
  if (args.length == 1) {
    word = args[0]; // The word to look up in the dictionary
  }
  else if (args.length == 2) {
    word = args[1]; // The word to look up in the dictionary
    if (args[0] == "EnglishUS") language = "en_US";
    else if (args[0] == "EnglishUK") language = "en_GB";
  }
  
  let url = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`; // Get the word info from the url
  let response = await fetch(url); // wait for the json fetch
  let json = await response.json(); // wait for the json to parse
  
  if (json.title == 'No Definitions Found') { // Couldn't find the word in dictionary
    msg.channel.send("This word isn't in the dictionary    (Ｔ▽Ｔ)");
    msg.channel.send('https://tenor.com/8MjS.gif');
    return;
  }
  
  
  for (let i = 0; i < json.length; i++) {
    
    let separateWord = json[i].word.toUpperCase();
    let phoneticsText = json[i].phonetics[0].text;
    let reply = '';
    if (i == 0) reply += "-----------------------------------------------------\n"
    reply += `**${separateWord}**  ${phoneticsText}\n`;
    msg.channel.send(reply);
    reply = ''
    
    for (let j = 0; j < json[i].meanings.length; j++) { // Loop through all the meanings
      let partOfSpeech = json[i].meanings[j].partOfSpeech;
      reply += `\nMeaning #${j+1} (${partOfSpeech}):\n\n`
      for (let k = 0; k < json[i].meanings[j].definitions.length; k++) { // loop through all the definitions
        let definition = json[i].meanings[j].definitions[k].definition;
        let example = json[i].meanings[j].definitions[k].example;
        if (example == undefined) example = "No example   (・へ・)";
        reply += `${k+1}: ${definition}\n     *${example}*\n`;
      }
    }
    reply += "\n-----------------------------------------------------";
    console.log(reply);
    msg.channel.send(reply);
    msg.channel.send(`Pronunciation #${i+1}:`, { files: [json[i].phonetics[0].audio] });
  }
}