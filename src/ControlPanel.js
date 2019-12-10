import React from "react";

export default function ControlPanel({ game }) {
  let putDownButtons = null;
  let pickUpButton = null;

  const currentPlayer = game.players[game.currentPlayerIndex];
  const currentTile = game.board.path[currentPlayer.currentLocation];

  if (currentPlayer.treasureBag.length > 0) {
    putDownButtons = currentPlayer.treasureBag.map((treasure, index) => {
      return (
        <button key={index} onClick={e => game.putDownTreasure(index)}>
          Put Down Treasure Of Level {treasure.valueLevel}
        </button>
      );
    });
  }

  if (currentTile.treasure) {
    pickUpButton = (
      <button onClick={e => game.pickUpTreasure()}>Pick Up Treasure</button>
    );
  }

  const playerInfo = game.players.map((player, index) => {
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
      <button onClick={e => game.move()}>Move</button>
      <button onClick={e => game.turnAround()}>Turn Around</button>
      {pickUpButton}
      {putDownButtons}
      <button onClick={e => game.endTurn()}>End Turn</button>
    </div>
  );
}
