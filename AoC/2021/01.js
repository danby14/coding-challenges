console.log('Advent of Code - Day 1');
const fs = require('fs');
const entries = fs.readFileSync('01.txt', 'utf8').split('\n');

const increasingOrNot = () => {
  let countA = 0;
  for (let i = 1; i < entries.length; i++) {
    if (+entries[i] > +entries[i - 1]) countA++;
  }
  console.log('pt1:', countA);
};

increasingOrNot();

const increasingSlidingWindowOrNot = () => {
  let prev = +entries[0] + +entries[1] + +entries[2];
  let countB = 0;
  for (let i = 3; i <= entries.length; i++) {
    let cur = +entries[i] + +entries[i - 1] + +entries[i - 2];
    if (cur > prev) countB++;
    prev = cur;
  }
  console.log('pt2:', countB);
};
increasingSlidingWindowOrNot();
