console.clear();
console.log('Advent of Code - Day 2');
const fs = require('fs');
const entries = fs.readFileSync('02.txt', 'utf8').split('\n');

const part1 = () => {
  // forward = + position , down = + depth, up = - depth
  let position = 0;
  let depth = 0;
  for (let i = 0; i < entries.length; i++) {
    let amt = +entries[i][entries[i].length - 1];
    if (entries[i].length === 9) position += amt;
    if (entries[i].length === 6) depth += amt;
    if (entries[i].length === 4) depth -= amt;
  }

  console.log('part1:', position * depth);
};

part1();

const part2 = () => {
  let position = 0;
  let depth = 0;
  let aim = 0;
  for (let i = 0; i < entries.length; i++) {
    let amt = +entries[i][entries[i].length - 1];
    if (entries[i].length === 9) {
      position += amt;
      depth += aim * amt;
    }
    if (entries[i].length === 6) aim += amt;
    if (entries[i].length === 4) aim -= amt;
  }

  console.log('part2:', position * depth);
};

part2();
