console.clear();
const fs = require('fs');
const entries = fs
  .readFileSync('./10.txt', 'utf-8')
  .split('\r\n')
  .map(x => +x);

const findJoltDiffences = data => {
  let sorted = data.sort((a, b) => a - b);
  sorted.unshift(0);
  sorted.push(sorted[sorted.length - 1] + 3);
  let ones = 0,
    twos = 0,
    threes = 0;

  for (let x = 0; x < data.length; x++) {
    if (sorted[x + 1] - 1 === sorted[x]) ones++;
    if (sorted[x + 1] - 2 === sorted[x]) twos++;
    if (sorted[x + 1] - 3 === sorted[x]) threes++;
  }
  console.log('Part 1:', ones * threes);
};
findJoltDiffences(entries);

// Part 2 logic. Find all spots that have both -1 before and +1 after.
// If it happens once in a row(combinations x 2), if 2 in a row (combinations x 4), if 3 in a row (combinations x 7)

const findNumberOfDifferentConfigs = data => {
  let sorted = data.sort((a, b) => a - b);
  sorted.unshift(0);
  sorted.push(sorted[sorted.length - 1] + 3);

  let combinations = 1;
  let consecutive = 0;
  for (let x = 0; x < data.length; x++) {
    if (sorted[x] - sorted[x - 1] === 1 && sorted[x + 1] - sorted[x] === 1) {
      consecutive++;
    } else {
      if (consecutive === 1) combinations *= 2;
      if (consecutive === 2) combinations *= 4;
      if (consecutive === 3) combinations *= 7;
      consecutive = 0;
    }
  }
  return combinations;
};
console.log('Part 2:', findNumberOfDifferentConfigs(entries));
