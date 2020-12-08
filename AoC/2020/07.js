console.clear();
const fs = require('fs');
const entries = fs.readFileSync('07.txt', 'utf8');

// Part 1: used recursion
let goldBagHolders = [];
const getHolders = (data, bagColor) => {
  let color = bagColor;
  let regex = new RegExp(`(?<=\\n)\\w*\\s\\w*(?=.*${color})`, 'g');
  const holders = data.match(regex);
  if (holders) {
    let temp = holders.flat();
    goldBagHolders.push(...temp);
    temp.forEach(color => getHolders(data, color));
  }
};

getHolders(entries, 'shiny gold');
console.log('Part 1:', [...new Set(goldBagHolders)].length); // 139

// Part 2: some more crazy recursion
let total = [];
const bagsInsideGold = (data, bagColor, numBags = 1) => {
  let color = bagColor;
  let regex = new RegExp(`(?<=\\n${color}.*)(\\d+)\\s(\\w+\\s\\w+)(?=\\sbags?\\b)`, 'g');
  const heldBags = [...data.matchAll(regex)];

  let temp = 0;
  if (heldBags.length > 0) {
    heldBags.forEach(bag => {
      let tempBags = numBags * +bag[1];
      temp += +bag[1];
      bagsInsideGold(entries, bag[2], tempBags);
    });
    total.push(temp * numBags);
  }
};

bagsInsideGold(entries, 'shiny gold');
let addedTotals = total.reduce((a, c) => a + c, 0);
console.log('Part 2:', addedTotals);
