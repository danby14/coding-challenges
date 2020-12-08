console.clear();
const fs = require('fs');
const entries = fs.readFileSync('06.txt', 'utf8').split('\r\n\r\n');
const cleanedUp = entries.map(x => x.split(/[\r][\n]/));

const part1 = groupVals => {
  const combined = groupVals.map(x => x.join('').split(''));
  const unique = combined.map(x => new Set(x).size);
  return unique.reduce((acc, cur) => acc + cur, 0);
};
console.log(part1(cleanedUp));

const part2 = groupVals => {
  const combined = groupVals.map(x => {
    return { [`${x.length}`]: x.join('').split('') };
  });

  let masterCount = 0;
  for (const group of combined) {
    for (const [totalMembers, vals] of Object.entries(group)) {
      const uniques = [...new Set(vals)];

      uniques.map(unique =>
        vals.filter(val => val === unique).length === +totalMembers ? ++masterCount : masterCount
      );
      // console.log(counts);
      // console.log('vals', vals);
      // console.log('unique', unique);
    }
  }
  return masterCount;
};

console.log(part2(cleanedUp));
