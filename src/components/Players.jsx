import React, { useEffect, useState } from "react";
import { useSecondsToString } from "../hooks/useSecondToMinute";
import { stylePlayerSelected } from "../constants/stylePlayerSelected";
import { motion } from "framer-motion";

const PlayersList = ({ players, playerId, timeBankToMinute }) => {
  return (
    <ul className="timerListPlayer">
      {players?.map((player) => (
        <li key={player.id} className="players">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="player"
            style={stylePlayerSelected(player, playerId)}
          >
            <span>
              {playerId === player.id
                ? timeBankToMinute
                : useSecondsToString(player.timerBank)}
            </span>
            <p>{player.name}</p>
          </motion.div>
        </li>
      ))}
    </ul>
  );
};

const NotPlayers = () => {
  return <p className="notPlayers">No hay jugadores agregados</p>;
};

export const Players = ({ players, playerId, timeBankToMinute }) => {
  const hasPlayers = players?.length > 0;

  return hasPlayers ? (
    <PlayersList
      players={players}
      playerId={playerId}
      timeBankToMinute={timeBankToMinute}
    />
  ) : (
    <NotPlayers />
  );
};
