console.clear();
const fs = require('fs');
const entries = fs.readFileSync('03.txt', 'utf8').split('\r\n');

let allTrees = [];
const findTreesHit = (arrOfStrgs, right, down) => {
  let x = 1;
  let y = 1;
  let trees = 0;
  while (x <= arrOfStrgs.length) {
    if (arrOfStrgs[x - 1][y - 1] === '#') trees++;
    x += down;
    if (y <= 31 - right) {
      y += right;
    } else {
      y -= 31 - right;
    }
  }
  allTrees.push(trees);
};

// Right 1, down 1. // 74
findTreesHit(entries, 1, 1);
// Right 3, down 1. // 189
findTreesHit(entries, 3, 1);
// Right 5, down 1. // 65
findTreesHit(entries, 5, 1);
// Right 7, down 1. // 63
findTreesHit(entries, 7, 1);
// Right 1, down 2. // 30
findTreesHit(entries, 1, 2);

console.log(allTrees);

const multiplyTrees = allVals => {
  return allVals.reduce((a, c) => a * c, 1);
};
console.log(multiplyTrees(allTrees));
