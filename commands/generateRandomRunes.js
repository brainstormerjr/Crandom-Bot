// generates a random set of runes

// import the required modules
const fs = require("fs"); // used to read the json file locally

// the exported function
module.exports = async function() {
  let response = fs.readFileSync("rune.json", "utf8"); // read the rune.json folder
  let json = await JSON.parse(response); // wait for the json to parse

  let treeNames = Object.keys(json); // the names of the trees are the keys of the json
  let primaryTree =
    treeNames[Math.floor(Math.random() * (treeNames.length - 1))]; // randomize the primary tree
  let secondaryTree;
  do {
    secondaryTree =
      treeNames[Math.floor(Math.random() * (treeNames.length - 1))]; // randomize the secondary tree
  } while (primaryTree == secondaryTree); // repeat while it is the same as the primary tree
  let runes = ["", [], [], []]; // final rune setup [keystone, 3 primary runes, 2 secondary runes, 3 rune stats]
  runes[0] =
    json[primaryTree][0][
      Math.floor(Math.random() * json[primaryTree][0].length)
    ]; // randomize the keystone
  for (let i = 1; i < 4; i++) {
    // loop through the 3 primary rune branches
    runes[1].push(
      json[primaryTree][i][
        Math.floor(Math.random() * json[primaryTree][i].length)
      ]
    ); // randomize each primary rune
  }
  // choose 2 branches from the 3 branches in the secondary tree
  let branch1 = Math.floor(Math.random() * 3) + 1; // first branch
  let branch2;
  do {
    branch2 = Math.floor(Math.random() * 3) + 1; // randomize second branch
  } while (branch1 == branch2); // repeat while branch 1 and 2 are the same
  // add the 2 branches to the rune
  runes[2].push(
    json[secondaryTree][branch1][
      Math.floor(Math.random() * json[secondaryTree][branch1].length)
    ]
  );
  runes[2].push(
    json[secondaryTree][branch2][
      Math.floor(Math.random() * json[secondaryTree][branch2].length)
    ]
  );
  for (let i = 0; i < 3; i++) {
    // loop through the 3 rune stat slots
    runes[3].push(
      json["Shards"][i][Math.floor(Math.random() * json["Shards"][i].length)]
    ); // randomize a rune stat and add to runes
  }

  // generate the message
  let msg = "**Runes:**\n\n"; // title
  msg += `**Keystone:**\n> ${runes[0]}\n\n`; // keystone
  msg += `**Primary Tree:**\n> ${runes[1][0]}\n> ${runes[1][1]}\n> ${
    runes[1][2]
  }\n\n`; // primary tree
  msg += `**Secondary Tree:**\n> ${runes[2][0]}\n> ${runes[2][1]}\n\n`; // secondary tree
  msg += `**Rune Stats:**\n> ${runes[3][0]}\n> ${runes[3][1]}\n> ${
    runes[3][2]
  }\n\n`; // rune stats

  return msg; // return the message
};
