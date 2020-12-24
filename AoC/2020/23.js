console.clear();
const fs = require('fs');
let cups = fs
  .readFileSync('./23.txt', 'utf-8')
  .split('')
  .map(x => parseInt(x));

function playGame(cups, turns) {
  let current = 0;
  for (let i = 0; i < turns; i++) {
    if (current > cups.length - 1) current = 0;
    let currentVal = cups[current];
    let one = (current + 1) % cups.length;
    let two = (current + 2) % cups.length;
    let three = (current + 3) % cups.length;
    let next3 = [cups[one], cups[two], cups[three]];
    // check without next 3 for current cup - 1, if below 0, wraps around to highest and goes from there
    let cups2 = cups.filter(cup => !next3.includes(cup));

    let orderedCups = [...cups2].sort((a, b) => a - b);

    let findNextIdx;
    let preNext = orderedCups.findIndex(c => c === currentVal);
    if (preNext > 0) findNextIdx = preNext - 1;
    else findNextIdx = orderedCups.length - 1;
    let destination = orderedCups[findNextIdx]; // actual value to insert 3 after
    let newIdx = cups2.findIndex(c => c === destination);
    // find where to insert 3 cups that were taken out
    if (newIdx === cups2.length - 1) {
      cups2.push(...next3);
    } else {
      cups2.splice(newIdx + 1, 0, ...next3);
    }
    // if current val is no longer at the current index, move it back to there
    let shifter = cups2.findIndex(x => x === currentVal) - current;
    if (shifter > 0) {
      let holder = cups2.splice(0, shifter);
      cups2.splice(cups2.length, 0, ...holder);
    }
    cups = cups2;
    current++;
  }
  console.log(cups);
}
playGame(cups, 100);
// 67384529 too hight
