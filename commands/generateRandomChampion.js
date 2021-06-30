const common = require("./common.js");
const fetch = require('node-fetch');

module.exports = async function () {
    let url = `http://ddragon.leagueoflegends.com/cdn/${common.patch}/data/en_US/champion.json`;
    let response = await fetch(url);
    let json = await response.json();
    let champions = Object.keys(json.data);
    if (champions != null) {
        let champIndex = Math.floor(Math.random() * champions.length);
        let champName = champions[champIndex];
        if (champName == "MonkeyKing") champName = "Wukong";
        return champName;
    }
}
