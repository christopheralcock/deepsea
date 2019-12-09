export default class Game {
  constructor(players) {
    console.log(this);
    this.players = this.createPlayers(players);
    this.board = new Board(this.players);
    this.excursionCount = 1;
    this.oxygenLevel = 25;
    this.isOver = false;
    this.currentPlayerIndex = 0;
    // this.excursionIsActive = true;
    console.log("game created: " + JSON.stringify(this));
  }

  move = amount => {
    this.players[this.currentPlayerIndex].move(this, amount);
  };

  pickUpTreasure = () => {
    this.players[this.currentPlayerIndex].pickUpTreasure(this.board);
  };

  putDownTreasure = treasureIndex => {
    this.players[this.currentPlayerIndex].pickUpTreasure(
      treasureIndex,
      this.board
    );
  };

  turnAround = () => {
    this.players[this.currentPlayerIndex].turnAround();
  };

  endTurn = () => {
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
  };

  createPlayers = function(players) {
    return players.map(x => new Player(x.name, x.colour));
  };

  finishExcursion = function() {
    console.log("Called finishExcursion");
    // this.excursionIsActive = false;
    this.killStrandedPlayers();
    this.tidyEmptySpaces();
    this.startNextExcursion();
  };

  startNextExcursion = function() {
    console.log("called startNextExcursion");
    console.log("excursion count: " + this.excursionCount);
    if (this.excursionCount < 3) {
      this.excursionCount++;
      this.resetOxygenLevel();
      for (let i = 0; i < this.players.length; i++) {
        let player = this.players[i];
        console.log(JSON.stringify(player));
        player.isHomeSafe = false;
        player.direction = "down";
      }
    } else this.finishGame();
  };

  finishGame = function() {
    this.isOver = true;
    console.log("GAME OVER\n\n\n\n\nGAME OVER");
    this.getFinalScores();
  };

  getFinalScores = function() {
    var players = this.players;
    var playerCount = this.players.length;
    for (let i = 0; i < playerCount; i++) {
      let player = players[i];
      console.log(
        player.name +
          " final score: " +
          this.calculateFinalScore(player.treasureStore)
      );
    }
  };

  calculateFinalScore = function(treasureStore) {
    console.log("calculateFinalScore called");
    // TO DO: MAKE THIS WORK
    // what if someone picks up a bundle and then dies and then the bundle is part of another bundle?
    var finalScore = 0;
    console.log("treasureStore length: " + treasureStore.length);
    for (let i = 0; i < treasureStore.length; i++) {
      console.log(treasureStore[i]);
      if (treasureStore[i].valueScore) {
        finalScore = finalScore + treasureStore[i].valueScore;
        console.log(i);
      }
      if (i.length > 0) {
        for (let j = 0; j < i.length; j++) {
          if (i[j].valueScore) {
            finalScore = finalScore + i[j].valueScore;
            console.log(j);
          }
        }
      }
    }
    return finalScore;
  };

  tidyEmptySpaces = function() {
    //TO DO: reintroduce tidy empty spaces in a way that doesn't kill  my dudes on the submarine
    console.log("called tidyEmptySpaces");
    this.board.path = this.board.path.filter(
      space => space.treasure || space instanceof Submarine
    );
    // remove all dead createPlayers
    console.log("tidyEmptySpaces: " + JSON.stringify(this.board.path[0]));
    for (let i = 1; i < this.board.path.length; i++) {
      this.board.path[i].players = [];
    }
  };

  killStrandedPlayers = function() {
    // TODO: refactor
    console.log("called killlllll");
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      if (!player.isHomeSafe) {
        player.isAlive = player.kill();
        if (player.treasureBag.length > 0) {
          var space = new Space();
          space.setTreasure(player.treasureBag);
          this.board.path.push(space);
          console.log("pushing " + JSON.stringify(player) + " to the sub");
          console.log(JSON.stringify(this.board.path[0]));

          this.board.path[0].players.push(player);
          console.log(JSON.stringify(this.board.path[0]));
          player.treasureBag = [];
          // TODO: make the set direction happen ehen the player is properly dead. make sure people cant start excursion 2 before everyone finishes excursion 1
          player.direction = "down";
          player.isHomeSafe = false;
        }
      }
    }
  };

  checkIfEveryoneIsHome = function() {
    console.log("checkIfEveryoneIsHome called");
    var playerCount = this.players.length;
    console.log("playerCount: " + playerCount);
    var safePlayers = 0;
    console.log("safePlayers: " + safePlayers);

    for (let i = 0; i < playerCount; i++) {
      let player = this.players[i];
      if (player.isHomeSafe) {
        safePlayers++;
        console.log("safePlayers: " + safePlayers);
      }
    }
    if (playerCount == safePlayers) {
      this.finishExcursion();
    }
    // console.log(playerCount);
    // if(this.players.some(player => player.isHomeSafe == false)){
    //   this.finishExcursion();
    // }
  };

  checkTheresStillOxygen = function() {
    if (this.oxygenLevel <= 0) {
      this.finishExcursion();
    }
  };

  resetOxygenLevel = function() {
    console.log("reset the oxygen level");
    this.oxygenLevel = 25;
  };
}

export class Player {
  constructor(name, colour) {
    this.name = name;
    this.colour = colour;
    // treasureBag is what you keep on you during an excursion
    this.treasureBag = [];
    this.currentLocation = 0;
    // treasureStore is what you've safely got back to the sub
    this.treasureStore = [];
    this.score = 0;
    this.direction = "down";
    this.isAlive = true;
    this.isHomeSafe = false;
    console.log("player created: " + JSON.stringify(this));
  }

  kill = function() {
    console.log("called kill on " + this.name);
    // this.treasureBag = [];
    this.isAlive = false;
  };

  oxygenDeplete = function(game) {
    game.oxygenLevel = game.oxygenLevel - this.treasureBag.length;
    console.log("oxygen level: " + game.oxygenLevel);
  };

  turnAround = function() {
    console.log(this.name + " has turned around!");
    this.direction = "up";
  };

  move = function(game, overrideNumber) {
    console.log("called move on " + this.name);
    if (this.isHomeSafe) {
      console.log("do not move, " + this.name + " already home safe");
      return;
    }
    this.oxygenDeplete(game);
    var roll = this.roll();
    if (overrideNumber) {
      console.log("override roll with: " + overrideNumber);
      roll = overrideNumber;
    }
    var spacesToGo = this.combineRollAndSpeedPenalty(roll);
    console.log("spaces to go: " + spacesToGo);
    while (
      spacesToGo > 0
      // && game.excursionIsActive
    ) {
      setTimeout(() => {
        this.moveOneSpace(game.board);
      }, spacesToGo * 50);
      spacesToGo--;
      // console.log("spaces to go: " + spacesToGo)
    }
    game.checkIfEveryoneIsHome();
    game.checkTheresStillOxygen();
  };

  combineRollAndSpeedPenalty = function(roll) {
    var roll = roll - this.treasureBag.length;
    if (roll < 0) {
      roll = 0;
    }
    return roll;
  };

  pickUpTreasure = function(board) {
    // TO DO add better handling for when there's no treasure
    var currentLocation = this.getLocation(board);
    if (board.path[currentLocation].treasure) {
      this.treasureBag.push(board.path[currentLocation].treasure);
      board.path[currentLocation].treasure = null;
      console.log("picked Up Treasure!!!!!!!!!!!!");
    } else {
      console.log("no treasure to pick up, dummy");
    }
    console.log(this.treasureBag);
  };

  putDownTreasure = function(treasureIndex, board) {
    var currentLocation = this.getLocation(board);
    if (board.path[currentLocation].treasure) {
      console.log("there is already treasure here, so you cannot put down");
    } else {
      board.path[currentLocation].treasure = this.treasureBag[treasureIndex];
      this.treasureBag.splice(treasureIndex, 1);
    }
    console.log(this.treasureBag);
  };

  getLocation = function(board) {
    // console.log("get location called")
    var location = "not found";
    for (let i = 0; i < board.path.length; i++) {
      if (
        board.path[i].players.some(
          item => item.colour == this.colour && item.name == this.name
        )
      ) {
        location = i;
        // console.log(this.name + " is at path index "+location);
        return location;
      }
    }
  };

  roll = function() {
    var possibleValues = [1, 2, 3];
    var dice1 =
      possibleValues[Math.floor(Math.random() * possibleValues.length)];
    var dice2 =
      possibleValues[Math.floor(Math.random() * possibleValues.length)];
    var distance = dice1 + dice2;
    // console.log(this.name + " rolled a " + distance);
    return distance;
  };

  moveOneSpace = function(board) {
    // TODO: refactor this horrible mess
    // console.log("moveOneSpace called");
    var stillNeedToMove = true;
    var directionFactor;
    if (this.direction == "down") {
      // console.log("checked direction: still going down");
      directionFactor = 1;
    } else {
      // console.log("checked direction: going up now");
      directionFactor = -1;
    }
    var currentLocation = this.getLocation(board);
    // console.log("currentLocation before while loop: "+currentLocation);
    var nextLocation = currentLocation + directionFactor;
    if (
      (this.direction == "down" && nextLocation >= board.path.length) ||
      (this.direction == "up" && currentLocation == 0)
    ) {
      stillNeedToMove = false;
    }

    while (stillNeedToMove) {
      // pick the player up
      board.path[currentLocation].players = board.path[
        currentLocation
      ].players.filter(e => e.colour !== this.colour);
      if (this.spaceIsHabitable(board, nextLocation)) {
        board.path[nextLocation].players.push(this);
        this.currentLocation = nextLocation;
        stillNeedToMove = false;
        console.log(this.name + " is at space index " + nextLocation);
        this.markHomeifNextLocationSubmarine(nextLocation);
      } else {
        currentLocation = nextLocation;
        nextLocation = currentLocation + directionFactor;
      }
    }
  };

  markHomeifNextLocationSubmarine = function(nextLocation) {
    if (nextLocation == 0) {
      this.markHomeSafe();
    }
  };

  spaceIsHabitable = function(board, spaceIndex) {
    return (
      this.spaceHasNoPlayersInIt(board, spaceIndex) ||
      this.spaceIsSubmarine(board, spaceIndex) ||
      this.spaceIsBottomOfBoard(board, spaceIndex)
    );
  };

  spaceHasNoPlayersInIt = function(board, spaceIndex) {
    return board.path[spaceIndex].players.length == 0;
  };

  spaceIsSubmarine = function(board, spaceIndex) {
    return board.path[spaceIndex] instanceof Submarine;
  };

  spaceIsBottomOfBoard = function(board, spaceIndex) {
    return spaceIndex == board.path.length - 1;
  };

  markHomeSafe = function() {
    this.isHomeSafe = true;
    var combinedTreasureBagAndStore = this.treasureStore;
    combinedTreasureBagAndStore.push(this.treasureBag);
    this.treasureStore = combinedTreasureBagAndStore;
    this.treasureBag = [];
    console.log(this.name + " is home safe!");
  };
}

export class Board {
  constructor(players) {
    this.submarine = new Submarine(players);
    this.tileSet = [
      {
        valueLevel: 1,
        valueScores: [0, 0, 1, 1, 2, 2, 3, 3]
      },
      {
        valueLevel: 2,
        valueScores: [4, 4, 5, 5, 6, 6, 7, 7]
      },
      {
        valueLevel: 3,
        valueScores: [8, 8, 9, 9, 10, 10, 11, 11]
      },
      {
        valueLevel: 4,
        valueScores: [12, 12, 13, 13, 14, 14, 15, 15]
      }
    ];
    this.shuffletileSet(this.tileSet);
    this.path = this.arrangeSpaces();
    console.log("board created: " + JSON.stringify(this));
  }

  arrangeSpaces = function() {
    var spaces = [this.submarine];
    for (let i1 = 0; i1 < this.tileSet.length; i1++) {
      for (let i2 = 0; i2 < this.tileSet[i1].valueScores.length; i2++) {
        var space = new Space();
        var treasure = new Treasure(
          this.tileSet[i1].valueLevel,
          this.tileSet[i1].valueScores[i2]
        );
        space.setTreasure(treasure);
        spaces.push(space);
      }
    }
    return spaces;
  };

  shuffletileSet = function(tileSet) {
    return tileSet.map(x => ({
      ...x,
      valueScores: this.shuffle(x.valueScores)
    }));
  };

  shuffle = function(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
}

export class Submarine {
  constructor(players) {
    this.players = players;
    this.treasure = null;
    console.log("Submarine created: " + JSON.stringify(this));
  }
}

export class Space {
  constructor() {
    this.treasure = null;
    this.players = [];
    console.log("Space created: " + JSON.stringify(this));
  }
  setTreasure = function(treasure) {
    console.log("setTreasure called");
    this.treasure = treasure;
  };
}

export class Treasure {
  constructor(valueLevel, valueScore) {
    this.valueLevel = valueLevel;
    this.valueScore = valueScore;
    console.log("Treasure created: " + JSON.stringify(this));
  }
}
