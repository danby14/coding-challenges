console.clear();
const fs = require('fs');
let entries = fs.readFileSync('./14.txt', 'utf-8').split('\r\n');

function toBinary(number) {
  const bin = new Array(36).fill(0, 0, 36);
  let ex = 35;
  let n = number;
  while (n > 0) {
    const r = n % 2;
    bin[ex] = r;
    n = Math.trunc(n / 2);
    ex--;
  }
  return bin;
}

function fromBinary(bits) {
  return bits.reduce((acc, cur, idx) => {
    let ex = bits.length - 1 - idx;
    let found = 2 ** ex * +cur;
    return acc + found;
  }, 0);
}

function maskValue(mask, value) {
  let newBin = [];
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '0') {
      newBin.push(0);
    } else if (mask[i] === '1') {
      newBin.push(1);
    } else {
      newBin.push(value[i]);
    }
  }
  return fromBinary(newBin);
}

function part1(input) {
  let mappedData = new Map();
  let currentMask;
  input.forEach(line => {
    if (line.startsWith('mask')) {
      [mask] = line.match(/([0X1]+$)/);
      currentMask = mask.split('');
    }
    if (line.startsWith('mem')) {
      let [, position, value] = line.match(/mem\[(\d+)\] = (\d+$)/);
      binaryValue = toBinary(+value);
      let maskedValue = maskValue(currentMask, binaryValue);
      mappedData.set(+position, maskedValue);
    }
  });
  return [...mappedData.values()].reduce((acc, cur) => acc + cur, 0);
}
console.log('Part 1:', part1(entries));

function maskPositions(mask, position) {
  let newBin = [];
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '0') {
      newBin.push(position[i]);
    } else if (mask[i] === '1') {
      newBin.push(1);
    } else {
      newBin.push('X');
    }
  }
  return newBin;
}
function getAllPositions(bits) {
  let holder = [];
  function replaceXsOs(bits) {
    let idx = bits.indexOf('X');
    let bits0 = [...bits];
    let bits1 = [...bits];
    if (bits.includes('X')) {
      bits0.splice(idx, 1, 0);
      bits1.splice(idx, 1, 1);
      replaceXsOs(bits0);
      replaceXsOs(bits1);
    } else {
      holder.push(fromBinary(bits));
    }
  }
  replaceXsOs(bits);
  return holder;
}

function part2(input) {
  let mappedData = new Map();
  let currentMask;

  input.forEach(line => {
    if (line.startsWith('mask')) {
      [mask] = line.match(/([0X1]+$)/);
      currentMask = mask.split('');
    }
    if (line.startsWith('mem')) {
      let [, position, value] = line.match(/mem\[(\d+)\] = (\d+$)/);
      binaryPosition = toBinary(+position);
      let encodedPositions = maskPositions(currentMask, binaryPosition);
      let positions = getAllPositions(encodedPositions);
      positions.forEach(pos => mappedData.set(pos, +value));
    }
  });
  return [...mappedData.values()].reduce((acc, cur) => acc + cur, 0);
}
console.log('Part 2:', part2(entries));
