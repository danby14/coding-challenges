console.clear();
const fs = require('fs');
let input = fs.readFileSync('./19.txt', 'utf-8').split('\r\n\r\n');

let messages = input[1].split('\r\n');

const rules = {};
input[0].split('\r\n').forEach(rule => {
  const { groups } = /^(?<key>\d+): (?<value>.*)$/.exec(rule);
  rules[groups.key] = groups.value;
});

let regExpRules = {};
function computeRules(value, allRules) {
  if (value in regExpRules) return regExpRules[value];
  let result = '';
  if (/^".*"$/.test(value)) {
    result = value.replace(/"/g, '');
  } else if (/\|/.test(value)) {
    const options = value.split(' | ');
    result = `(${computeRules(options[0], rules)}|${computeRules(options[1], rules)})`;
  } else {
    const keys = value.split(' ');
    result = keys.map(key => computeRules(rules[key], rules)).join('');
  }
  regExpRules[value] = result;
  return result;
}
computeRules(rules[0], rules);

let rule0regex = new RegExp('^' + regExpRules[rules[0]] + '$');

let finalCounter = 0;
for (let message of messages) {
  if (rule0regex.test(message)) finalCounter++;
}
console.log('Part 1:', finalCounter);
