console.clear();
const data = [0, 8, 15, 2, 12, 1, 4];

// If that was the first time the number has been spoken, the current player says 0.
// Otherwise, the number had been spoken before; the current player announces how many turns apart the number is from when it was previously spoken.

function makeStartingData(firstFewNums) {
  let prevGameHistory = new Map();
  let gameHistory = new Map();
  for (let i = 0; i < firstFewNums.length; i++) {
    gameHistory.set(firstFewNums[i], i + 1);
  }
  for (let i = 0; i < firstFewNums.length - 1; i++) {
    prevGameHistory.set(firstFewNums[i], i + 1);
  }
  return [prevGameHistory, gameHistory, firstFewNums[firstFewNums.length - 1]];
}

function elfMemoryGame(startingData, desiredSpot) {
  let prevGameHistory = startingData[0];
  let gameHistory = startingData[1];
  let curVal = startingData[2];

  for (let i = startingData[1].size + 1; i <= desiredSpot; i++) {
    if (prevGameHistory.has(curVal)) {
      let tempCurVal = curVal;
      curVal = i - prevGameHistory.get(curVal) - 1;
      prevGameHistory.set(tempCurVal, i - 1);
      gameHistory.set(curVal, i);
    } else {
      prevGameHistory.set(curVal, i - 1);
      curVal = 0;
      gameHistory.set(curVal, i);
    }
  }
  console.log(curVal);
}

elfMemoryGame(makeStartingData(data), 2020); // Part 1
// elfMemoryGame(makeStartingData(data), 30000000); // Part 2 (takes ~5-10 seconds to run)
