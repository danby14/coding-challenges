console.clear();
const fs = require('fs');
const games = fs.readFileSync('./02.txt', 'utf8').split('\n');

// Opponent
// A - Rock, B - Paper, C - Scissors
// You
// X - Rock(1), Y - Paper(2), Z - Scissors(3)
// Lost(0), Draw(3), Won(6)

// Part 1
// A vs X(1+3),Y(2+6),Z(3+0)
// B vs X(1+0),Y(2+3),Z(3+6)
// C vs X(1+6),Y(2+0),Z(3+3)
let outcomes1 = {
  A: { X: 4, Y: 8, Z: 3 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 7, Y: 2, Z: 6 },
};

let part1 = games.reduce((acc, cur) => {
  let game = cur.split(' ');
  return acc + outcomes1[game[0]][game[1]];
}, 0);

console.log({ part1 });

//Part 2. Second column says what you need to do.
// X - Lose, Y - Draw, Z - Win
// A vs X(3+0), Y(1+3), Z(2+6)
// B vs X(1+0), Y(2+3), Z(3+6)
// C vs X(2+0), Y(3+3), Z(1+6)
let outcomes2 = {
  A: { X: 3, Y: 4, Z: 8 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 2, Y: 6, Z: 7 },
};

let part2 = games.reduce((acc, cur) => {
  let game = cur.split(' ');
  return acc + outcomes2[game[0]][game[1]];
}, 0);

console.log({ part2 });
