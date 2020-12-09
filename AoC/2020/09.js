console.clear();
const fs = require('fs');
const entries = fs.readFileSync('./09.txt', 'utf-8').split('\r\n');
// console.log(entries);
// test data answer: 127
const checker = (maxSize, data) => {
  let counter = -1;
  for (let i = maxSize; i < data.length; i++) {
    let current = +data[i];
    let j = i - maxSize;
    // console.log('current', current);
    while (j < i) {
      let found = false;
      for (let k = j + 1; k < i; k++) {
        if (+data[j] + +data[k] === current) {
          // console.log(+data[j] + +data[k]);
          found = true;
        }
      }
      if (found) {
        counter++;
        break;
      }
      j++;
    }
    if (counter !== i - maxSize) return console.log('failed:', current);
  }
};
console.log(checker(25, entries));

// Part 2
const findSumFromRange = (sumToFind, data, range) => {
  for (let i = 0; i < data.length; i++) {
    let rangeOfNums = data.slice(i, i + range);
    let total = rangeOfNums.reduce((acc, cur) => +acc + +cur, 0);
    if (total === sumToFind) {
      console.log(rangeOfNums);
      return rangeOfNums;
    }
  }
};

// manually increased the range from 3+, until finally 17 gave me a result. Brute force FTW!
// could of looped it, but this isn't an optimal solution overall anyways.
// Will need some rethinking and optimizations if I ever actually have to save Christmas.
let neededRange = findSumFromRange(1309761972, entries, 17);

const addLowHigh = arrOfNums => {
  arrOfNums.sort((a, b) => a - b);
  console.log(+arrOfNums[0] + +arrOfNums[arrOfNums.length - 1]);
};

addLowHigh(neededRange);
