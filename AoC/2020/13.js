console.clear();
const fs = require('fs');
let entries = fs.readFileSync('./13.txt', 'utf-8').split('\r\n');

function departSoon(input) {
  const leaveAt = +entries[0];
  let closestDepartureTime = leaveAt;
  const availBusses = entries[1]
    .replace(/,x/g, '')
    .split(',')
    .map(busNum => +busNum);
  let keepGoing = true;
  let busTaken;

  while (keepGoing) {
    for (let bus of availBusses) {
      if (closestDepartureTime % bus === 0) {
        busTaken = bus;
        keepGoing = false;
      }
    }
    if (keepGoing) closestDepartureTime++;
  }
  return (closestDepartureTime - leaveAt) * busTaken;
}

console.log('Part 1: ', departSoon(entries));

console.log('-----------------------------');

function orderOfDepartures(input) {
  const busList = input[1].split(',');
  let curVal = 0;
  let keepGoing = true;
  let counter;
  while (keepGoing) {
    counter = 0;

    while (counter < busList.length) {
      if (busList[counter] === 'x') {
        counter++;
        continue;
      }
      if ((curVal + counter) % +busList[counter] === 0) {
        counter++;
        continue;
      }
      if ((curVal + counter) % +busList[counter] !== 0) break;
    }

    if (counter === busList.length) keepGoing = false;
    if (keepGoing) curVal++;
  }
  console.log('dont run this, unless using small data sets, it will go forever.');
  return curVal;
}

console.log('Part 2: ', orderOfDepartures(entries));

// the following is a short answer to part 2 someone else came up with. works with any input size quick.
let part2answer = entries[1].split(',').reduce(
  (acc, cur, idx) => {
    if (cur != 'x') {
      while ((acc[0] + idx) % cur) acc[0] += acc[1];
      acc[1] *= cur;
    }
    return acc;
  },
  [0, 1]
)[0];
console.log('not my solution, but will work on all data sets');
console.log('Part 2: ', part2answer);
