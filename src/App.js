import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import cx from "classnames";

import Game from "./Game";
import ControlPanel from "./ControlPanel";
import { Player, Space, Submarine, Treasure, Board } from "./Game";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.currentPlayerIndex = 0;
    this.state = {
      renderId: 0
    };

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

  render() {
    // console.log(this.game);

    const path = this.displayPath();

    return (
      <div className="game-container">
        <ControlPanel game={this.game} />
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
