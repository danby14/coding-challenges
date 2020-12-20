console.clear();
const fs = require('fs');
let rectangles = fs.readFileSync('./20.txt', 'utf-8').split('\r\n\r\n');

const options = new Map();

function parseEdges(item) {
  let allRows = item.split('\r\n');
  let rowData = allRows.slice(1);
  const id = /\d+/.exec(allRows[0])[0];
  const first = rowData[0];
  const firstRev = rowData[0].split('').reverse().join('');
  const last = allRows[allRows.length - 1];
  const lastRev = allRows[allRows.length - 1].split('').reverse('').join('');
  let left = '';
  let right = '';
  for (let row of rowData) {
    left += row[0];
    right += row[row.length - 1];
  }
  leftRev = left.split('').reverse().join('');
  rightRev = right.split('').reverse().join('');
  options.set(id, [first, firstRev, last, lastRev, left, leftRev, right, rightRev]);
}

function runPart1(entries) {
  // put all edges of whole dataset into a Map
  for (entry of entries) {
    parseEdges(entry);
  }
  // check if sections match top/bottom left/right in forward and reverse
  let corners = [];
  for (let [key1, value1] of options) {
    let listy = [];
    for (let [key2, value2] of options) {
      if (key1 !== key2) {
        for (let val1 of value1) {
          for (let val2 of value2) {
            if (val1 === val2) {
              listy.push(key2);
            }
          }
        }
      }
    }
    if (new Set(listy).size === 2) corners.push(key1);
  }
  console.log(corners);
  return corners.reduce((acc, cur) => +acc * cur, 1);
}
console.log('Part 1:', runPart1(rectangles));
console.log('Part 2: not doing that right now');
