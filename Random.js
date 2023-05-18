const { std } = require('mathjs')

dice = [];

class Die {
  constructor() {
    //create a die object and create a roll function for each die
    this.value = 0;
    this.set = false;
    this.rolls = 0;
    this.roll = function () {
      this.value = Math.floor(Math.random() * 6) + 1;
      this.rolls++;
    };
  }
}

for (var i = 0; i < 5; i++) {
  var die = new Die();
  die.roll();
  dice.push(die);
}

function rollDice() {
  //roll all the dice
  for (var i = 0; i < dice.length; i++) {
    dice[i].roll();
  }
}

function printGame() {
  //print the game
  for (var i = 0; i < dice.length; i++) {
    console.log(dice[i].value);
  }
}

function checkHand() {
  yahtzee = 0;
  fullHouse = false;
  smallScore = 0;
  largeScore = 0;
  kindScore = 0;
  fullScore = 0;
  chanceScore = 0;

  //of A Kind
  var maxKind = 0;
  for (var i = 0; i < 6; i++) {
    count = 0;
    for (var j = 0; j < dice.length; j++) {
      if (dice[j].value == i + 1) {
        count++;
      }
    }
    if (count > maxKind) {
      if (count == 3) {
        var fullHouse = true;
      }
      maxKind = count;
    }
  }
  var kindScore = 0;
  if (maxKind >= 3) {
    for (var i = 0; i < dice.length; i++) {
      kindScore += dice[i].value;
    }
  }
  if (maxKind == 5) {
    var yahtzee = 50;
  }

  //Full House
  if (fullHouse) {
    for (var i = 0; i < 6; i++) {
      count = 0;
      for (var j = 0; j < dice.length; j++) {
        if (dice[j].value == i + 1) {
          count++;
        }
        if (j == dice.length - 1 && count == 2) {
          var fullScore = 25;
        }
      }
    }
  }
  //Straights
  sortedArr = dice.sort();
  var smallScore = 0;
  var largeScore = 0;
  count = 0;
  function checkNext(i) {
    if (i < sortedArr.length - 1) {
      if (sortedArr[i].value == sortedArr[i + 1].value) {
        return false;
      }
      return true;
    }
    return true;
  }

  function findNext(current, count) {
    for (var i = 0; i < dice.length; i++) {
      if (dice[i].value == current) {
        count++;
        i = 10;
        if (count == 4) {
          smallScore = 30;
        }
        if (count == 5) {
          largeScore = 40;
          break;
        }
        findNext(current + 1, count);
      }
    }
  }
  for (var i = 1; i <= 2; i++) {
    findNext(i, 0);
  }

  //Yahtzee

  type = "None";
  score = 0;
  if (kindScore > score) {
    score = kindScore;
    type = "Of A Kind";
  }
  if (fullScore > score) {
    score = fullScore;
    type = "Full House";
  }
  if (smallScore > score) {
    score = smallScore;
    type = "Small Straight";
  }
  if (largeScore > score) {
    score = largeScore;
    type = "Large Straight";
  }
  if (yahtzee > score) {
    score = yahtzee;
    type = "Yahtzee";
  }

  return [type, score];
}

totalScore = 0;
yahtzeeCount = 0;
largeStraightCount = 0;
smallStraightCount = 0;
fullHouseCount = 0;
ofAKindCount = 0;
handArr = [];
standardDeviation = 0;
for (var i = 0; i < 1000000; i++) {
  rollDice();
  totalScore += checkHand()[1];
  handArr.push(checkHand()[1]);
  if (checkHand()[0] == "Yahtzee") {
    yahtzeeCount++;
  } else if (checkHand()[0] == "Large Straight") {
    largeStraightCount++;
  } else if (checkHand()[0] == "Small Straight") {
    smallStraightCount++;
  } else if (checkHand()[0] == "Full House") {
    fullHouseCount++;
  } else if (checkHand()[0] == "Of A Kind") {
    ofAKindCount++;
  }
}
meanScore = totalScore / 1000000;

standardDeviation = std(handArr);


console.log("Yahtzee: " + yahtzeeCount);
console.log("Large Straight: " + largeStraightCount);
console.log("Small Straight: " + smallStraightCount);
console.log("Full House: " + fullHouseCount);
console.log("Of A Kind: " + ofAKindCount);
console.log("Mean Score: " + meanScore);
console.log("Standard Deviation: " + standardDeviation);
