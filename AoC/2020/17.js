console.clear();
console.log('--------a--------');
const fs = require('fs');
let input = fs
  .readFileSync('./17.txt', 'utf-8')
  .split('\r\n')
  .map(row => row.split(''));

const userInput = new Map();

function addLayer(z, map, data) {
  if (!data) {
    let long = map.get(0).length;
    let wide = map.get(0)[0].length;
    data = new Array(long).fill('.').map(_ => new Array(wide).fill('.'));
  }
  map.set(z, data);
  return map;
}
addLayer(0, userInput, input);

function countActiveNeighbors(currentState, pX, pY, pZ) {
  let neighbors = 0;
  for (let z = -1; z < 2; z++)
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        if (
          currentState.get(z + pZ) &&
          currentState.get(z + pZ)[x + pX] &&
          currentState.get(z + pZ)[x + pX][y + pY]
        )
          if (currentState.get(z + pZ)[x + pX][y + pY] === '#') {
            // following if statement removes main cube we are finding neighbors for
            if (x + pX === pX && y + pY === pY && z + pZ === pZ) continue;
            neighbors += 1;
          }
      }
    }
  return neighbors;
}

function stretchGrid(allGrids) {
  let [top, bottom, left, right] = [0, 0, 0, 0];

  allGrids.forEach(grid => {
    if (grid[0].includes('#')) top++;
    if (grid[grid.length - 1].includes('#')) bottom++;
    grid.forEach(line => {
      if (line[0] === '#') left++;
      if (line[line.length - 1] === '#') right++;
    });
  });

  allGrids.forEach((grid, z) => {
    if (top > 0) grid.unshift(new Array(grid[0].length).fill('.'));
    if (bottom > 0) grid.push(new Array(grid[0].length).fill('.'));
    allGrids.set(z, grid);
    grid.forEach((row, x) => {
      if (left > 0) row.unshift('.');
      if (right > 0) row.push('.');
    });
  });
  let layers = [...allGrids.keys()].sort((a, b) => a - b);
  let lower = layers[0];
  let upper = layers[layers.length - 1];
  if (allGrids.get(lower).flat().includes('#')) addLayer(lower - 1, allGrids);
  if (allGrids.get(upper).flat().includes('#')) addLayer(upper + 1, allGrids);
  return allGrids;
}

function makeChanges(allGrids, changes) {
  allGrids.forEach((grid, z) => {
    changes.forEach(change => {
      if (change[2] === z) {
        grid[change[0]][change[1]] = change[3];
        allGrids.set(z, grid);
      }
    });
  });
  return allGrids;
}

function cycleCubes(currentFormation) {
  stretchGrid(currentFormation);
  let changesToMake = [];

  currentFormation.forEach((grid, z) => {
    grid.forEach((row, x) => {
      row.forEach((item, y) => {
        let neighbors = countActiveNeighbors(currentFormation, x, y, z);
        if (item === '#' && (neighbors < 2) | (neighbors > 3)) {
          changesToMake.push([x, y, z, '.']);
        }
        if (item === '.' && neighbors === 3) {
          changesToMake.push([x, y, z, '#']);
        }
      });
    });
  });
  makeChanges(currentFormation, changesToMake);
  return currentFormation;
}

function runBlankTimes(times, input) {
  while (times > 0) {
    input = cycleCubes(input);
    times--;
    return runBlankTimes(times, input);
  }
  return input;
}
let final = runBlankTimes(6, userInput);

function part1Count(finalMap) {
  let counter = 0;
  finalMap.forEach((grid, z) => {
    let texty = grid.flat().join('');
    let blah = texty.match(/#/g);
    if (texty.match(/#/)) {
      counter += blah.length;
    }
  });
  return counter;
}
console.log('Part 1:', part1Count(final));
