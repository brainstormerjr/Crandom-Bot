const common = require("./common.js");
const fetch = require('node-fetch');

module.exports = async function (champion) {
    let displayName = champion;
    if (champion == "Wukong") champion = "MonkeyKing";
    let url = `http://ddragon.leagueoflegends.com/cdn/${common.patch}/data/en_US/champion/${champion}.json`;
    let response = await fetch(url);
    let json = await response.json();
    let msg = "";
    let spellKeys = ["Q", "W", "E", "R"];
    msg += "**" + displayName.toUpperCase() + ": " + json.data[champion].title.toUpperCase() + "**\n\n";
    let passive = json.data[champion].passive;
    msg += "**Passive: " + passive.name + "**\n";
    let passiveDescription = passive.description.replace(/<br><br>/g, "\n> ");
    passiveDescription = passiveDescription.replace(/<br>/, "");
    passiveDescription = passiveDescription.replace(/<[^<>]{0,}>/g, "");
    msg += "> " + passiveDescription + "\n\n";
    for (let i = 0; i < 4; i++)
    {
        let ability = json.data[champion].spells[i];
        msg += "**" + spellKeys[i] + ": " + ability.name + "**" + "\n";
        msg += "> ***Cooldown: " + ability.cooldownBurn + "     Cost: ";
        let resource = ability.resource;
        let regExp = /{{([^}]+)}}/g;
        let matches = resource.match(regExp);
        if (matches != null) {
            for (let i = 0; i < matches.length; i++) {
                name = matches[i];
                if (name.includes("cost")) {
                    resource = resource.replace("{{ cost }}", ability.costBurn);
                } else if (name.includes("abilityresourcename")) {
                    resource = resource.replace("{{ abilityresourcename }}", json.data[champion].partype);
                } else if (name.includes(" e")) {
                    let index = parseInt(name[4]);
                    resource = resource.replace(/{{ e. }}/, ability.effectBurn[index]);
                }
            }
        }
        resource = resource.replace(/\([^()]+\)/, "");
        msg += resource + "***\n";
        // if (ability.costType != "No Cost") {
        //     msg += "Cost: " + ability.costBurn + " " + json.data[champion].partype + "***\n";
        // } else {
        //     msg += "No Cost***\n";
        // }
        let description = ability.description.replace(/<br><br>/g, "\n> ");
        description = description.replace(/<br>/, "");
        description = description.replace(/<[^<>]{0,}>/g, "");
        msg += "> " + description + "\n\n";
    }
    return msg;
}
