console.clear();
const fs = require('fs');
let entries = fs.readFileSync('./12.txt', 'utf-8').split('\r\n');

function sailAway(input) {
  let coords = [0, 0];
  let curDirection = 'E';

  function getDirection(current, turn, amount) {
    let leftDirections = ['E', 'S', 'W', 'N'];
    let rightDirections = ['E', 'N', 'W', 'S'];
    let directions;
    if (turn === 'R') {
      directions = rightDirections;
    } else {
      directions = leftDirections;
    }
    currentIdx = directions.indexOf(current);
    let newDirection;
    switch (amount) {
      case 90:
        newDirection = currentIdx - 1;
        break;
      case 180:
        newDirection = currentIdx - 2;
        break;
      case 270:
        newDirection = currentIdx - 3;
        break;

      default:
        newDirection = currentIdx;
        break;
    }
    newDirection < 0 ? (newDirection = 4 + newDirection) : newDirection;
    return directions[newDirection];
  }
  for (let i of input) {
    let [_skip, action, value] = i.match(/^(\w)(\d+)$/i);
    if (action === 'L' || action === 'R') curDirection = getDirection(curDirection, action, +value);
    if (action === 'F') action = getDirection(curDirection, action, 0);
    switch (action) {
      case 'N':
        coords[1] = coords[1] + +value;
        break;
      case 'S':
        coords[1] = coords[1] - +value;
        break;
      case 'E':
        coords[0] = coords[0] + +value;
        break;
      case 'W':
        coords[0] = coords[0] - +value;
        break;

      default:
        break;
    }
  }
  return (total = Math.abs(coords[0]) + Math.abs(coords[1]));
}

console.log('Part 1: ', sailAway(entries));

function printedDirections(input) {
  let x = 0,
    y = 0,
    wx = 10,
    wy = 1;
  for (let i of input) {
    let [_skip, action, value] = i.match(/^(\w)(\d+)$/i);
    if (action === 'F') {
      x += wx * +value;
      y += wy * +value;
    }
    if (action === 'N') wy = wy + +value;
    if (action === 'S') wy = wy - +value;
    if (action === 'E') wx = wx + +value;
    if (action === 'W') wx = wx - +value;
    if (action === 'R') {
      let tempWX = wx;
      let tempWY = wy;
      switch (value) {
        case '90': {
          wx = tempWY;
          wy = -tempWX;
          break;
        }
        case '180': {
          wx = -tempWX;
          wy = -tempWY;
          break;
        }
        case '270': {
          wx = -tempWY;
          wy = tempWX;
          break;
        }
        default:
          break;
      }
    }
    if (action === 'L') {
      let tempWX = wx;
      let tempWY = wy;
      switch (value) {
        case '90': {
          wx = -tempWY;
          wy = tempWX;
          break;
        }
        case '180': {
          wx = -tempWX;
          wy = -tempWY;
          break;
        }
        case '270': {
          wx = tempWY;
          wy = -tempWX;
          break;
        }
        default:
          break;
      }
    }
  }
  return Math.abs(x) + Math.abs(y);
}
console.log('Part 2: ', printedDirections(entries));
