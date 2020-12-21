console.clear();
const fs = require('fs');
let allData = fs.readFileSync('./21.txt', 'utf-8');
let items = fs.readFileSync('./21.txt', 'utf-8').split('\r\n');

function parseLabels(label) {
  let allergens = label.match(/(?<=ains\s).*[^\)]/)[0].split(', ');
  let ingredients = /^.*(?=\s\(cont)/.exec(label)[0].split` `;
  return { allergens, ingredients };
}

const allergenBreakdown = new Map();
function makeIngredientMap(allergen, ingredients) {
  if (!allergenBreakdown.has(allergen)) allergenBreakdown.set(allergen, ingredients);
  let current = allergenBreakdown.get(allergen);
  let updated = [];
  for (let ingredient of ingredients) {
    if (current.includes(ingredient)) updated.push(ingredient);
  }
  allergenBreakdown.set(allergen, updated);
}

let knownAllergenTranslations = [];
function widdleDown(allergens) {
  let taken = allergens.find(x => x.length === 1 && !knownAllergenTranslations.includes(x[0]));
  if (taken) {
    if (!knownAllergenTranslations.includes(taken)) knownAllergenTranslations.push(taken[0]);
    for (let [idx, al] of allergens.entries()) {
      if (al.length > 1 && al.includes(taken[0])) {
        allergens[idx] = al.filter(x => x !== taken[0]);
      }
    }
    return widdleDown(allergens);
  }
  return allergens;
}

function removeAllergensFromData(knownAllergens) {
  let removeAl = new RegExp(knownAllergens.join('|'), 'g');
  let onlyIngr = allData.replace(/\(.*\)/g, '');
  let minusAl = onlyIngr.replace(removeAl, '');
  return minusAl.match(/\w+/g).length;
}

function narrowDownList(list) {
  // make map of options for each allergen
  list.map(item => {
    let { allergens, ingredients } = parseLabels(item);
    allergens.forEach(allergen => {
      makeIngredientMap(allergen, ingredients);
    });
  });

  let allergensArray = [...allergenBreakdown.values()];
  // take the allergen that only has one possibility, then remove it from the other allergens. repeat until all allergens have only 1 possible translation
  let knownAllergens = widdleDown(allergensArray);

  // Part 2 //
  let idx = 0;
  for (let [key, val] of allergenBreakdown.entries()) {
    allergenBreakdown.set(key, knownAllergens[idx]);
    idx++;
  }
  console.log(
    'Part 2:',
    [...allergenBreakdown]
      .sort()
      .map(m => m[1])
      .flat()
      .join(',')
  );
  // End Part 2 //

  // Return Part 1
  // remove each of the final allergen translation from the input data, then count the words remaining
  return removeAllergensFromData(knownAllergens);
}
console.log('Part 1:', narrowDownList(items));
