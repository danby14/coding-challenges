console.clear();
const fs = require('fs');
const entries = fs.readFileSync('./01.txt', 'utf8').split('\n');

let calsPerElf = [];
let elf = 0;
let cals = 0;
let max = -Infinity;

for (let i = 0; i < entries.length; i++) {
  cals += +entries[i];
  if (entries[i] === '') {
    if (cals > max) max = cals;
    calsPerElf.push(cals);
    elf++;
    cals = 0;
  }
}
// Part 1
console.log(max);

// Part 2
let ordered = calsPerElf.sort((a, b) => b - a);
const finalPart2 = ordered[0] + ordered[1] + ordered[2];
console.log(finalPart2);
