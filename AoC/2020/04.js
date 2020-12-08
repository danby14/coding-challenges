console.clear();
const fs = require('fs');
const entries = fs.readFileSync('04.txt', 'utf8').split('\r\n\r\n');

const fastCheck = data => {
  let passed = 0;
  const re = /ecl:|pid:|eyr:|hcl:|byr:|iyr:|hgt:/g;
  data.forEach(item => {
    if (item.match(re).length === 7) {
      passed++;
    }
  });
  return passed;
};

console.log('shallow check', fastCheck(entries)); // 228

const deepCheck = data => {
  let totalValidated = 0;

  for (const user of data) {
    let tempTotal = 0;

    let byr = user.match(/byr:([0-9]{4})\b/);
    if (byr) {
      if (+byr[1] >= 1920 && +byr[1] <= 2002) tempTotal++;
    }

    let iyr = user.match(/iyr:([0-9]{4})\b/);
    if (iyr) {
      if (+iyr[1] >= 2010 && +iyr[1] <= 2020) tempTotal++;
    }

    let eyr = user.match(/eyr:([0-9]{4})\b/);
    if (eyr) {
      if (+eyr[1] >= 2020 && +eyr[1] <= 2030) tempTotal++;
    }

    let hgtIn = user.match(/(?<=hgt:)([\d]{2})in\b/);
    if (hgtIn) {
      if (+hgtIn[1] >= 59 && +hgtIn[1] <= 76) tempTotal++;
    }

    let hgtCm = user.match(/(?<=hgt:)([\d]{3})cm\b/);
    if (hgtCm) {
      if (+hgtCm[1] >= 150 && +hgtCm[1] <= 193) tempTotal++;
    }

    let hcl = /hcl:(#[\da-f]{6})\b/;
    if (user.match(hcl)) tempTotal++;

    let ecl = user.match(/ecl:(?=amb\b|blu\b|brn\b|gry\b|grn\b|hzl\b|oth\b)/);
    if (ecl) tempTotal++;

    let pid = /pid:[\d]{9}\b/;
    if (user.match(pid)) tempTotal++;

    // console.log(tempTotal);
    if (tempTotal === 7) totalValidated++;
  }

  return totalValidated;
};

console.log('deep check', deepCheck(entries)); // 175
