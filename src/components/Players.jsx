import React, { useEffect, useState } from "react";
import { useSecondsToString } from "../hooks/useSecondToMinute";

const PlayersList = ({ players }) => {

  console.log("render");

  return (
    <ul className="timerListPlayer">
      {players?.map((player) => (
        <li key={player.id} className="players">
          <div
            className="player"
            style={{ background: player.color, borderRadius: "3vw" }}
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

export const Players = ({ players }) => {
  const hasPlayers = players?.length > 0;

  return hasPlayers ? <PlayersList players={players} /> : <NotPlayers />;
};
