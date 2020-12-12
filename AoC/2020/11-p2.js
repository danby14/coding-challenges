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

      let adjacent = ['uL', 'uC', 'uR', 'sL', 'sR', 'dL', 'dC', 'dR'];
      for (let a = 0; a < adjacent.length; a++) {
        let distance = 1;

        function goFurther(direction, distance) {
          let directions = [
            [row - distance, col - distance], // upper left
            [row - distance, col], // upper center
            [row - distance, col + distance], // upper right
            [row, col - distance], // same left
            [row, col + distance], // same right
            [row + distance, col - distance], // down left
            [row + distance, col], // down center
            [row + distance, col + distance], // down right
          ];

          rowX = directions[direction][0];
          colX = directions[direction][1];

          let pointer;
          if (data[rowX]) {
            pointer = data[rowX][colX];
          }

          if (pointer === '#') {
            counter++;
            return;
          } else if (pointer === '.') {
            distance++;
            return goFurther(direction, distance);
          } else {
            return;
          }
        }

        goFurther(a, distance);
      }

      if (current === 'L' && counter === 0) {
        valueToUse = '#';
        changed++;
      }
      if (current === '#' && counter > 4) {
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

let part2data = changeSeats(entries);

function countSeatsTaken(finalData) {
  console.log('Part 2: ', finalData.flat().filter(f => f === '#').length);
}

countSeatsTaken(part2data);
