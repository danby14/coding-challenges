console.clear();
console.log(' --------------ab-------------');
const fs = require('fs');
let input = fs.readFileSync('./18.txt', 'utf-8').split('\r\n');

function solve(str) {
  let tokens = str.split(' ');
  while (tokens.length > 1) {
    let operation = `${tokens[0]} ${tokens[1]} ${tokens[2]}`;
    tokens = [eval(operation)].concat(tokens.slice(3));
  }
  return tokens;
}

function addFirst(str) {
  const re = /(\d+ \+ \d+)/;
  while (re.test(str)) {
    str = str.replace(re, (match, captureGroup, idx, strUsed) => {
      return solve(captureGroup);
    });
  }
  return str;
}

function parensFirst(str) {
  const re = /\(([^()]+)\)/;
  while (re.test(str)) {
    str = str.replace(re, (match, captureGroup, idx, strUsed) => {
      captureGroup = addFirst(captureGroup); // comment out for part 1 answer
      return solve(captureGroup);
    });
  }
  str = addFirst(str); // comment out for part 1 answer
  str = solve(str);
  return +str;
}

parensFirst(input[0]);

function part1total(input) {
  return input.reduce((acc, cur) => {
    cur = parensFirst(cur);
    return acc + cur;
  }, 0);
}
console.log('Part 2:', part1total(input));
// to see part 1 solution, comment out addFirst function references in parensFirst function
