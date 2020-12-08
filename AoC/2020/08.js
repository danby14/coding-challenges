console.clear();
const fs = require('fs');
const entries = fs.readFileSync('08.txt', 'utf8').split('\r\n');

const part1 = data => {
  let accumulator = 0;
  let takenIndexes = [];
  let i = 0;
  while (i < data.length) {
    takenIndexes.push(i);
    const info = data[i].match(/^(\w+)\s(.*)/);
    let instruction = info[1];
    let num = +info[2];

    if (instruction === 'acc') {
      accumulator += num;
      i++;
    }
    if (instruction === 'nop') {
      i++;
    }
    if (instruction === 'jmp') {
      i += num;
    }

    if (takenIndexes.includes(i)) break;
  }

  console.log('Part 1:', accumulator);
  return takenIndexes;
};

const part1copy = data => {
  let accumulator = 0;
  let takenIndexes = [];
  let i = 0;
  while (i < data.length) {
    takenIndexes.push(i);
    const info = data[i].match(/^(\w+)\s(.*)/);
    let instruction = info[1];
    let num = +info[2];

    if (instruction === 'acc') {
      accumulator += num;
      i++;
    }
    if (instruction === 'nop') {
      i++;
    }
    if (instruction === 'jmp') {
      i += num;
    }

    if (takenIndexes.includes(i)) break;
  }

  if (i >= data.length) {
    console.log('Part 2:', accumulator);
    return true;
  } else return false;
};

const part2 = (data, takenIndexes) => {
  // iterate over takenIndexes from part1
  takenIndexes.forEach(idx => {
    // for each one change the next nop/jmp to a jmp/nop then run it through the function used in part1 to see if it has a final idx >= length of data array.
    if (entries[idx].includes('nop')) {
      let dataCopy = [...data];
      dataCopy[idx] = dataCopy[idx].replace('nop', 'jmp');
      let attempt = part1copy(dataCopy);
      if (attempt) {
        // console.log(idx);
        return true;
      }
    }
    if (entries[idx].includes('jmp')) {
      let dataCopy = [...data];
      dataCopy[idx] = dataCopy[idx].replace('jmp', 'nop');
      let attempt = part1copy(dataCopy);
      if (attempt) {
        // console.log(idx);
        return true;
      }
    }
  });
};

let part1Data = part1(entries);
part2(entries, part1Data);
