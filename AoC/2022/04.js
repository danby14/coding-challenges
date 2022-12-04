console.clear();
const fs = require('fs');
const pairs = fs.readFileSync('./04.txt', 'utf8').split('\n');

const partOne = () => {
  let count = 0;
  for (const pair of pairs) {
    let elfA = pair.split(',')[0];
    let elfB = pair.split(',')[1];

    let elfAsection = elfA.split('-');
    let elfBsection = elfB.split('-');

    if (+elfBsection[0] >= +elfAsection[0] && +elfBsection[1] <= +elfAsection[1]) {
      count++;
      continue;
    }

    if (+elfAsection[0] >= +elfBsection[0] && +elfAsection[1] <= +elfBsection[1]) {
      count++;
    }
  }
  console.log('Part 1:', count);
};
partOne();

const partTwo = () => {
  let count = 0;
  for (const pair of pairs) {
    let elfA = pair.split(',')[0];
    let elfB = pair.split(',')[1];

    let elfAsection = elfA.split('-');
    let elfBsection = elfB.split('-');

    if (+elfAsection[0] >= +elfBsection[0] && +elfAsection[0] <= +elfBsection[1]) {
      count++;
      continue;
    }
    if (+elfBsection[0] >= +elfAsection[0] && +elfBsection[0] <= +elfAsection[1]) {
      count++;
    }
  }
  console.log('Part 2:', count);
};
partTwo();
