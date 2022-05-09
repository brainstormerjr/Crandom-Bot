const helpDialogue =
  "**🤖HI! I AM CRANDOM, A DISCORD BOT! 🤖**\n" +
  "**If you are stuck, here is a sneak peek of my commands**🤫\n\n" +
  "> **changeprefix <new prefix>**: change the prefix to yourprefix (default prefix is c)\n" +
  "> **cjoin**: join the voice channel that you are currently in\n" +
  "> **cleave**: leave the voice channel that you are currently in\n" +
  "> **cplay <youtube link>**: play a youtube video's audio in the voice channel\n" +
  "> **cpause**: pause the audio player\n" +
  "> **cresume**: resume the audio player\n" +
  "> **cqueue <youtube link>**: add a youtube video to queue\n" +
  "> **cshowqueue**: show the video player's queue\n" +
  "> **cskip**: play the next video in queue\n" +
  "> **cgif <keyword>**: get me to send you a random gif related to the keyword\n" +
  "> **champion <champion name>**: search for a champion's abilities in League of Legends (no spaces in name, case sensitive)\n" +
  "> **crandomchampion**: generate a random League of Legends champion\n" +
  "> **crandombuild**: generate a random League of Legends item build\n" +
  "> **crandomrunes**: generate a random set of League of Legends runes\n" +
  "> **crandomsumms**: generate a random pair of League of Legends summoner spells\n" +
  "> **crandom**: generate a random champion, build, runes and summoner spells for a random loadout\n" +
  "> **crandom <elements separated with a space>**: randomize a given list as well as generate one random element\n" +
  "> **cdictionary <word>**: get the definition and pronunciation of the provided word\n" +
  "> **chelp**: show the list of all possible commands (this list 🤯 so meta!)";

module.exports = function(msg, args) {
  msg.channel.send(helpDialogue);
  msg.react(msg.guild.emojis.cache.find(emoji => emoji.name === "LULW"));
};
