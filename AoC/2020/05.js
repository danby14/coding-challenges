console.clear();
const fs = require('fs');
const entries = fs.readFileSync('./05.txt', 'utf-8').split('\r\n');

const getRow = (first7, maxRows) => {
  let row = [0, maxRows - 1];
  first7.forEach(x => {
    const halfWay = Math.ceil((row[1] - row[0]) / 2);
    if (x === 'F') row = [row[0], row[1] - halfWay];

    if (x === 'B') row = [row[0] + halfWay, row[1]];
  });
  return row[0];
};

const getColumn = last3 => {
  let possibleCols = [0, 1, 2, 3, 4, 5, 6, 7];
  last3.forEach(x => {
    if (x === 'L') possibleCols = possibleCols.splice(0, possibleCols.length / 2);
    else possibleCols = possibleCols.splice(possibleCols.length / 2);
  });
  return possibleCols[0];
};

const getSeatId = (row, col) => {
  return row * 8 + col;
};

const part1 = inputData => {
  let highestSeatId = 0;
  inputData.forEach(x => {
    const groups = x.match(/(^\w{7})(\w{3}$)/);
    const jumbledRow = groups[1].split('');
    const rowNum = getRow(jumbledRow, 128);
    const jumbledCol = groups[2].split('');
    const colNum = getColumn(jumbledCol);
    const seatId = getSeatId(rowNum, colNum);
    if (seatId > highestSeatId) highestSeatId = seatId;
  });
  console.log('Part 1:', highestSeatId);
};
part1(entries);

// Part 2
const getSeatIds = inputData => {
  let takenIds = [];
  inputData.forEach(x => {
    const groups = x.match(/(^\w{7})(\w{3}$)/);
    const jumbledRow = groups[1].split('');
    const rowNum = getRow(jumbledRow, 128);
    const jumbledCol = groups[2].split('');
    const colNum = getColumn(jumbledCol);
    const seatId = getSeatId(rowNum, colNum);
    takenIds.push(seatId);
  });
  return takenIds;
};

const findYourSeat = () => {
  const takenSeats = getSeatIds(entries);
  let sortedSeats = takenSeats.sort((a, b) => a - b);
  for (const [idx, seat] of [...sortedSeats.entries()]) {
    if (seat !== takenSeats[idx + 1] - 1) return seat + 1;
  }
};
console.log('Part 2:', findYourSeat());
