import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import cx from "classnames";

import Game from "./Game";
import { Player, Space, Submarine, Treasure, Board } from "./Game";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.currentPlayerIndex = 0;
    this.state = {
      renderId: 0
    };
    // var c = game.players[0];
    // var s = game.players[1];

    this.game = new Game([
      { name: "chris", colour: "Red" },
      { name: "sophie", colour: "Green" }
    ]);
    window.game = this.game;

    setInterval(this.updateDisplay, 10);
  }

  updateDisplay = () => {
    this.setState({ renderId: this.state.renderId++ });
  };

  displayPlayers = tile => {
    return tile.players.map((player, index) => {
      return (
        <div
          key={index}
          className="player"
          style={{ backgroundColor: player.colour.toLowerCase() }}
        >
          <span className="direction">
            {player.direction === "down" ? ">" : "<"}
          </span>
          <p className="name">{player.name}</p>
        </div>
      );
    });
  };

  displayPath = () => {
    return this.game.board.path.map((tile, index) => {
      let type = "";
      if (tile instanceof Submarine) {
        type = "submarine";
      } else if (tile instanceof Space) {
        type = "space";
      }

      let playerElements = this.displayPlayers(tile);

      let valueLabelElement = "";
      if (tile.treasure) {
        if (Array.isArray(tile.treasure)) {
          valueLabelElement = tile.treasure
            .map(treasure => treasure.valueLevel)
            .join(", ");
        } else {
          valueLabelElement = tile.treasure.valueLevel;
        }
      }

      return (
        <div key={index} className={cx("tile-item", type)}>
          <p className="value-level">{valueLabelElement}</p>
          {playerElements}
        </div>
      );
    });
  };

  displayControlPanel = () => {
    let putDownButtons = null;
    let pickUpButton = null;

    const currentPlayer = this.game.players[this.game.currentPlayerIndex];
    const currentTile = this.game.board.path[currentPlayer.currentLocation];

    if (currentPlayer.treasureBag.length > 0) {
      putDownButtons = currentPlayer.treasureBag.map((treasure, index) => {
        return (
          <button key={index} onClick={e => this.game.putDownTreasure(index)}>
            Put Down Treasure Of Level {treasure.valueLevel}
          </button>
        );
      });
    }

    if (currentTile.treasure) {
      pickUpButton = (
        <button onClick={e => this.game.pickUpTreasure()}>
          Pick Up Treasure
        </button>
      );
    }

    const playerInfo = this.game.players.map((player, index) => {
      let playerBag = "Nothing";
      if (player.treasureBag.length > 0) {
        playerBag = player.treasureBag
          .map(treasure => treasure.valueLevel)
          .join(", ");
      }
      return (
        <>
          <p>
            Player {index + 1} Store: {JSON.stringify(player.treasureStore)}
          </p>
          <p>
            Player {index + 1} Bag: {playerBag}
          </p>
        </>
      );
    });

    return (
      <div className="control-panel">
        <div className="player-status">{playerInfo}</div>
        <br />
        <button onClick={e => this.game.move()}>Move</button>
        <button onClick={e => this.game.turnAround()}>Turn Around</button>
        {pickUpButton}
        {putDownButtons}
        <button onClick={e => this.game.endTurn()}>End Turn</button>
      </div>
    );
  };

  render() {
    // console.log(this.game);

    const path = this.displayPath();
    const controlPanel = this.displayControlPanel();

    return (
      <div className="game-container">
        {controlPanel}
        {path}
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
