console.clear();
console.log('Advent of Code - Day 3');
const fs = require('fs');
const entries = fs.readFileSync('03.txt', 'utf8').split('\n');

const part1 = () => {
  const total = entries.length;
  const counts = [];

  for (let i = 0; i < entries[0].length; i++) {
    counts.push([0]);
    for (let j = 0; j < total; j++) {
      if (entries[j][i] == 1) counts[i]++;
    }
  }

  let x = '',
    y = '';

  for (let c = 0; c < counts.length; c++) {
    if (counts[c] > total / 2) {
      x += '1';
      y += '0';
    } else {
      x += '0';
      y += '1';
    }
  }

  // take binary numbers in string form and parse it to decimal, then multiply the two
  console.log('p1:', parseInt(x, 2) * parseInt(y, 2));
};

part1();

const part2 = () => {
  // recursion?
  // oxygen generator rating = most common value in current bit position, tie goes to 1
  // c02 scrubber rating = least common value in current bit position, tie goes to 0

  function findCommonBit(data, position, wanted) {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i][position] == '1') count++;
    }
    if (wanted == 'most') {
      if (count < data.length / 2) return 0;
      else return 1;
    }
    if (wanted === 'least') {
      if (count < data.length / 2) return 1;
      else return 0;
    }
  }

  function widdleDown(data, position, common) {
    let updatedData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i][position] == common) updatedData.push(data[i]);
    }
    return updatedData;
  }

  function ratings(input, pos, wantedOccurence) {
    if (input.length === 1) return input[0];
    let mode = findCommonBit(input, pos, wantedOccurence);
    let data = widdleDown(input, pos, mode);
    return ratings(data, ++pos, wantedOccurence);
  }

  let OGR = ratings(entries, 0, 'most');
  let CSR = ratings(entries, 0, 'least');

  console.log('part2:', parseInt(OGR, 2) * parseInt(CSR, 2));
};

part2();
