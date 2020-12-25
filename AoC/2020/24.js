console.clear();
console.log('-----------c--------');
const fs = require('fs');
let tiles = fs.readFileSync('./24.txt', 'utf-8').split('\r\n');

let tileStatus = new Map();

let moves = {
  e: [1, 0],
  se: [0, 1],
  sw: [-1, 1],
  w: [-1, 0],
  nw: [0, -1],
  ne: [1, -1],
};

function axialMove(cur, move) {
  let [curX, curY] = cur;
  let [moveX, moveY] = move;
  curX += moveX;
  curY += moveY;
  return [curX, curY];
}

function flipTiles(tile) {
  let starting = [0, 0];
  let cur = starting;
  let re = /(se)|(sw)|(nw)|(ne)|(e)|(w)/g;
  let jumps = tile.split(re).filter(d => d);
  for (let jump of jumps) {
    cur = axialMove(cur, moves[jump]);
  }
  if (tileStatus.has(`${cur}`)) tileStatus.delete(`${cur}`);
  else tileStatus.set(`${cur}`, true);
}

function allFlipsP1(turns) {
  for (let turn of turns) {
    flipTiles(turn);
  }
  return tileStatus.size;
}
console.log('Part 1:', allFlipsP1(tiles));

// Part 2,
// flip black tiles that have 0 or >2 black tiles next to them.
// flip white tiles that have exactly 2 black tiles next

let whitesToCheck = new Set();
function getNeighbors(x, y, nOn) {
  // nOn is short for neighbors of neighbors
  // count flipped neighbors
  let total = 0;
  for (let dir of Object.values(moves)) {
    let [dX, dY] = dir;
    dX += x;
    dY += y;
    if (tileStatus.has(`${dX},${dY}`)) {
      total++;
    } else if (nOn) {
      whitesToCheck.add(`${dX}, ${dY}`);
    }
  }
  return total;
}

function flipOneDay() {
  let currentDay = new Map([...tileStatus]);
  for (let tile of tileStatus.keys()) {
    let [x, y] = tile.split(',').map(t => parseInt(t));
    let totalNeighbors = getNeighbors(x, y, true);
    if (totalNeighbors === 0 || totalNeighbors > 2) {
      currentDay.delete(`${x},${y}`);
    }
  }
  for (let w of whitesToCheck) {
    let [x, y] = w.split(',').map(t => parseInt(t));
    let totalNeighbors = getNeighbors(x, y, false);
    if (totalNeighbors === 2) currentDay.set(`${x},${y}`, true);
  }
  tileStatus = currentDay;
}

for (let i = 1; i <= 100; i++) {
  flipOneDay();
}
console.log('Part 2:', tileStatus.size);
