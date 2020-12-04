console.clear();
const fs = require('fs');
const entries = fs.readFileSync('02.txt', 'utf8').split('\r\n');
// const testData = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']; // 1 and 3 are valid
// Part 1: See which passwords are valid. (1-3 a: abcde) this password requires 1-3 a's. So it is valid.
const part1 = () => {
  let valid = 0;

  const sanitize = value => {
    const captureGroups = /(\d+)-(\d+)\s(.):\s(\w+)/i;
    const parts = value.match(captureGroups);
    const min = +parts[1];
    const max = +parts[2];
    const letter = parts[3];
    const pass = parts[4];
    let occurences = pass.match(new RegExp(letter, 'gi')) || [];
    occurences = occurences.length;

    if (occurences >= min && occurences <= max) valid += 1;
    // if (occurences >= min && occurences <= max) return true;
  };

  const countValidPasswords = values => {
    values.forEach(value => {
      sanitize(value);
      return;
    });
  };

  countValidPasswords(entries);
  console.log('p1', valid);
};
part1();

// Part 2: "1-3 a: abcde" is there an "a" at position 1or3 in the password, not both.
const part2 = () => {
  let valid = 0;
  const sanitize = value => {
    const captureGroups = /(\d+)-(\d+)\s(.):\s(\w+)/i;
    const parts = value.match(captureGroups);
    const spot1 = +parts[1] - 1;
    const spot2 = +parts[2] - 1;
    const letter = parts[3];
    const pass = parts[4];
    if (pass[spot1] === letter && pass[spot2] === letter) return false;
    if (pass[spot1] === letter || pass[spot2] === letter) return valid++;
  };

  const countValidPasswords = values => {
    values.forEach(value => {
      sanitize(value);
      return;
    });
  };
  countValidPasswords(entries);

  console.log('p2', valid);
};
part2();
