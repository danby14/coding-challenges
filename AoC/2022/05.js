console.clear();
console.log('------');
const fs = require('fs');
const instructions = fs.readFileSync('./05.txt', 'utf8').split('\n');

const stacks = {
  1: ['R', 'G', 'J', 'B', 'T', 'V', 'Z'],
  2: ['J', 'R', 'V', 'L'],
  3: ['S', 'Q', 'F'],
  4: ['Z', 'H', 'N', 'L', 'F', 'V', 'Q', 'G'],
  5: ['R', 'Q', 'T', 'J', 'C', 'S', 'M', 'W'],
  6: ['S', 'W', 'T', 'C', 'H', 'F'],
  7: ['D', 'Z', 'C', 'V', 'F', 'N', 'J'],
  8: ['L', 'G', 'Z', 'D', 'W', 'R', 'F', 'Q'],
  9: ['J', 'B', 'W', 'V', 'P'],
};

const part1 = stacks1 => {
  for (const instruction of instructions) {
    let moves = instruction.split(/[^\d]+/);
    let amount = +moves[1];
    let from = moves[2];
    let to = +moves[3];
    for (let i = 0; i < amount; i++) {
      let take = stacks1[from].pop();
      stacks1[to].push(take);
    }
  }
  let answer = '';
  for (const value of Object.values(stacks1)) {
    answer += value[value.length - 1];
  }
  console.log('part1:', answer);
};
part1(JSON.parse(JSON.stringify(stacks)));

// Part 2: change pop to slice
const part2 = stacks2 => {
  for (const instruction of instructions) {
    let moves = instruction.split(/[^\d]+/);
    let amount = +moves[1];
    let from = +moves[2];
    let to = +moves[3];

    let take = stacks2[from].splice(-amount);
    stacks2[to] = stacks2[to].concat(take);
  }
  let answer = '';
  for (const value of Object.values(stacks2)) {
    answer += value[value.length - 1];
  }
  console.log('part2:', answer);
};
part2(JSON.parse(JSON.stringify(stacks)));
