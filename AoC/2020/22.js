console.clear();
const fs = require('fs');
let players = fs.readFileSync('./22.txt', 'utf-8').split('\r\n\r\n');
let p1cards = players[0]
  .split('\r\n')
  .slice(1)
  .map(c => parseInt(c));
let p2cards = players[1]
  .split('\r\n')
  .slice(1)
  .map(c => parseInt(c));

function compareTopCards(p1cards, p2cards) {
  while (p1cards.length > 0 && p2cards.length > 0) {
    let p1hand = p1cards.shift();
    let p2hand = p2cards.shift();
    if (p1hand > p2hand) {
      p1cards.push(p1hand, p2hand);
    } else p2cards.push(p2hand, p1hand);
  }
  if (p1cards.length > 0) return p1cards;
  else return p2cards;
}
let winningHand = compareTopCards(p1cards, p2cards);

let total = 0;
let idx = 0;
for (let num = winningHand.length; num > 0; num--) {
  total += winningHand[idx] * num;
  idx++;
}
console.log('Part 1:', total);
