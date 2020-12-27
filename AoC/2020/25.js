console.clear();
console.log('--------day 25--------');

const fs = require('fs');
let keys = fs
  .readFileSync('./25.txt', 'utf-8')
  .split('\r\n')
  .map(k => parseInt(k));

let cardKey = keys[0];
let doorKey = keys[1];

let divider = 20201227;
let subjectNumber = 7;
let turns = 10000000;

let loopTable = new Array(turns).fill(1);

for (let loop = 1; loop <= turns; loop++) {
  loopTable[loop] = (loopTable[loop - 1] * subjectNumber) % divider;
}

let cardLoop = loopTable.indexOf(cardKey);
let doorLoop = loopTable.indexOf(doorKey);

console.log('card loop', cardLoop);
console.log('door loop', doorLoop);

let handshakes = new Array(cardLoop).fill(1);
for (let loop = 1; loop <= cardLoop; loop++) {
  handshakes[loop] = (handshakes[loop - 1] * doorKey) % divider;
}
console.log('handshakes', handshakes[cardLoop]);
