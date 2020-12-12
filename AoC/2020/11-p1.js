console.clear();
const fs = require('fs');
let entries = fs.readFileSync('./11.txt', 'utf-8').split('\r\n');
entries = entries.map(d => d.split(''));

function changeSeats(data) {
  let copy = [];
  let changed = 0;
  for (let row = 0; row < data.length; row++) {
    let rowArr = Array(data[0].length).fill(0);
    for (let col = 0; col < data[0].length; col++) {
      let counter = 0;

      let current = data[row][col];
      let valueToUse = current;

      // above
      if (data[row - 1]) {
        if (data[row - 1][col - 1] === '#') counter++;
        if (data[row - 1][col] === '#') counter++;
        if (data[row - 1][col + 1] === '#') counter++;
      }

      // same row
      if (data[row][col - 1] === '#') counter++;
      if (data[row][col + 1] === '#') counter++;

      // below
      if (data[row + 1]) {
        if (data[row + 1][col - 1] === '#') counter++;
        if (data[row + 1][col] === '#') counter++;
        if (data[row + 1][col + 1] === '#') counter++;
      }
      if (current === 'L' && counter === 0) {
        valueToUse = '#';
        changed++;
      }
      if (current === '#' && counter > 3) {
        valueToUse = 'L';
        changed++;
      }

      rowArr[col] = valueToUse;
      counter = 0;
    }
    copy.push(rowArr);
  }
  if (changed > 0) {
    return changeSeats(copy);
  }
  return copy;
}

let part1data = changeSeats(entries);

function countSeatsTaken(finalData) {
  console.log('Part 1: ', finalData.flat().filter(f => f === '#').length);
}

countSeatsTaken(part1data);
