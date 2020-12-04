console.clear();
const fs = require('fs');
const entries = fs.readFileSync('01.txt', 'utf8').split('\r\n');
// Part 1: Find the two numbers in a list that add up to 2020. Then multiply those two numbers.
// const entries = [62, 57, 29, 85, 16, 8, 26, 84, 1996, 1117, 888, 999, 838]; // 4 * 1996
// for (let i = 0; i < entries.length; i++) {
//   for (let j = 0; j < entries.length; j++) {
//     if (+entries[j] + +entries[i] === 2020) {
//       return console.log(+entries[j] * +entries[i]);
//     }
//   }
// }

// Part 2: Now make it 3 numbers that add up to 2020 and then multiply them by each other
let part1totals = new Set();
for (let i = 0; i < entries.length; i++) {
  for (let j = i + 1; j < entries.length; j++) {
    if (+entries[j] + +entries[i] <= 2020) {
      part1totals.add(+entries[j] + +entries[i]);
    }
  }
}

let part1totalsArr = [...part1totals];
let holder = [];
for (let i = 0; i < entries.length; i++) {
  for (let j = i + 1; j < part1totalsArr.length; j++) {
    if (+entries[i] + +part1totalsArr[j] === 2020) {
      holder.push(entries[i]);
    }
  }
}

console.log(holder);

if (+holder[0] + +holder[1] + +holder[2] === 2020) {
  console.log(+holder[0] * +holder[1] * +holder[2]);
}
