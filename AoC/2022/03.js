console.clear();
const fs = require('fs');
const rucksacks = fs.readFileSync('./03.txt', 'utf8').split('\n');

const partOne = () => {
  let total = 0;
  rucksacks.forEach(rucksack => {
    let lng = rucksack.length / 2;
    let compartmentA = rucksack.slice(0, lng);
    let compartmentB = rucksack.slice(lng);
    let cache = {};

    for (const item of compartmentA) {
      if (!cache[item]) {
        // compartment A items to cache, no care about dupes
        cache[item] = 1;
      }
    }

    for (const item of compartmentB) {
      if (cache[item]) {
        // item is in compartment A and B, find it's priority number
        let priorityNum = item.charCodeAt();
        if (priorityNum > 96) {
          // lowercase
          priorityNum = priorityNum - 96;
        } else {
          // uppercase
          priorityNum = priorityNum - 38;
        }
        total += priorityNum;
        break;
      }
    }
  });
  console.log(total);
};
partOne();

const partTwo = () => {
  let total = 0;
  while (rucksacks.length > 0) {
    let group = rucksacks.splice(-3, 3);
    let cache = {};

    for (const item of group[0]) {
      if (!cache[item]) {
        cache[item] = 1;
      }
    }

    for (const item of group[1]) {
      if (cache[item]) cache[item] = 2;
    }

    for (const item of group[2]) {
      if (cache[item] === 2) {
        let priorityNum = item.charCodeAt();
        if (priorityNum > 96) {
          // lowercase
          priorityNum = priorityNum - 96;
        } else {
          // uppercase
          priorityNum = priorityNum - 38;
        }
        total += priorityNum;
        break;
      }
    }
  }
  console.log(total);
};

partTwo();
