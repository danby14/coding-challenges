console.clear();
console.log('-------------------');
const fs = require('fs');
let tiles = fs.readFileSync('./24.txt', 'utf-8').split('\r\n');

const tileStatus = new Map();

function axialMove(cur, move) {
  let [curX, curY] = cur;
  let [moveX, moveY] = move;
  curX += moveX;
  curY += moveY;
  return [curX, curY];
}

function flipTiles(tile) {
  let move = {
    e: [1, 0],
    se: [0, 1],
    sw: [-1, 1],
    w: [-1, 0],
    nw: [0, -1],
    ne: [1, -1],
  };
  let starting = [0, 0];
  let cur = starting;
  let re = /(se)|(sw)|(nw)|(ne)|(e)|(w)/g;
  let jumps = tile.split(re).filter(d => d);
  for (let jump of jumps) {
    cur = axialMove(cur, move[jump]);
  }
  if (tileStatus.has(`${cur}`)) tileStatus.set(`${cur}`, !tileStatus.get(`${cur}`));
  else tileStatus.set(`${cur}`, true);
}

function allFlipsP1(turns) {
  for (let turn of turns) {
    flipTiles(turn);
  }
  let flipped = 0;
  tileStatus.forEach(tile => (tile === true ? flipped++ : flipped));
  return flipped;
}
console.log('Part 1:', allFlipsP1(tiles));
