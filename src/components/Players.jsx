import React, { useEffect, useState } from "react";
import { useSecondsToString } from "../hooks/useSecondToMinute";

const PlayersList = ({ players, playerId}) => {

  console.log("render");
  console.log("playerId :: " + playerId);

  return (
    <ul className="timerListPlayer">
      {players?.map((player) => (
        <li key={player.id} className="players">
          <div
            className="player"
            style={player.id === playerId ? { background: player.color, borderRadius: "5vw", border: "1vw solid #f1f1f1" } : { background: player.color, borderRadius: "5vw" }}
          >
            <span>{useSecondsToString(player.timerBank)}</span>
            <p>{player.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const NotPlayers = () => {
  return <p style={{ textAlign: "center" }}>No hay jugadores agregados</p>;
};

export const Players = ({ players, playerId}) => {
  const hasPlayers = players?.length > 0;

  return hasPlayers ? <PlayersList players={players} playerId={playerId} /> : <NotPlayers />;
};
