console.clear();
const fs = require('fs');
let input = fs.readFileSync('./16.txt', 'utf-8');
let parts = input.split('\r\n\r\n');
let fieldRanges = parts[0];
let yourTicket = parts[1]
  .split('\n')[1]
  .split(',')
  .map(val => +val);
let nearbyTixTxt = parts[2].split(':\r\n')[1].split('\r\n');
let nearbyTickets = nearbyTixTxt.map(line => line.split(',').map(item => +item));

function findAndAddInvalids(tickets, min, max) {
  let counter = 0;
  for (let ticket of tickets) {
    counter += ticket.filter(item => (item < min) | (item > max)).reduce((a, c) => a + c, 0);
  }
  return counter;
}

console.log('Part 1:', findAndAddInvalids(nearbyTickets, 26, 974));
// 23044

function removeInvalidTix(tickets, min, max) {
  let validTix = [];
  for (let ticket of tickets) {
    let notUsable = ticket.filter(item => (item < min) | (item > max));
    if (!notUsable.length) {
      validTix.push(ticket);
    }
  }
  return validTix;
}
// Basically 26-974 can be valid. outside of that.. Not Valid
const usable = removeInvalidTix(nearbyTickets, 26, 974);
console.log('-------------------------------');

function figureOutFields(validTix) {
  let ranges = fieldRanges.split('\r\n');
  let maxMins = [];
  for (let range of ranges) {
    let re = /(?<=: )(\d+)-(\d+) or (\d+)-(\d+)/;
    let vals = range.match(re);
    maxMins.push([+vals[1], +vals[2], +vals[3], +vals[4]]);
  }

  const possibilites = new Map();
  let zeroTo19 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  for (let i = 0; i < 20; i++) {
    possibilites.set(i, zeroTo19);
  }

  for (let tix of validTix) {
    for (let [idx, t] of tix.entries()) {
      for (let [idx2, avail] of zeroTo19.entries())
        if (
          (t >= maxMins[idx2][0] && t <= maxMins[idx2][1]) |
          (t >= maxMins[idx2][2] && t <= maxMins[idx2][3])
        ) {
          continue;
        } else {
          let removePossible = possibilites.get(idx2).filter(x => x !== idx);
          possibilites.set(idx2, removePossible);
        }
    }
  }
  return [...possibilites.values()];
}
let step1 = figureOutFields(usable);

let finalResult = new Map();
function cutDownPossibles(possibilites) {
  let valToDel;
  for (let [idx, options] of possibilites.entries()) {
    if (options.length === 1) {
      // console.log(idx, options);
      valToDel = options;
      finalResult.set(idx, options[0]);
    } else count = 0;
  }
  possibilites = possibilites.map(x => x.filter(f => f != valToDel));
  while (valToDel) {
    return cutDownPossibles(possibilites);
  }
  return possibilites;
}
cutDownPossibles(step1);

let sortedVals = [...finalResult].sort((a, b) => a[0] - b[0]);
let totalCounter = 1;
let tempArr = []; // too see which values are being used, not needed for answer
for (let i = 0; i < 6; i++) {
  let idToUse = sortedVals[i][1];
  tempArr.push(yourTicket[idToUse]);
  totalCounter *= yourTicket[idToUse];
}
console.log(tempArr);
console.log('Part 2:', totalCounter);
