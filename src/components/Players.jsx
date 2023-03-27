import React from "react";
import { useSecondsToString } from "../hooks/useSecondToMinute";
import { stylePlayerSelected } from "../constants/stylePlayerSelected";
import { motion } from "framer-motion";
import { Reorder } from "framer-motion"
import { useState } from "react"

const PlayersList = ({ players, playerId, timeBankToMinute }) => {

  const [playersReorder, setPlayersReorder] = useState(players);
  

  return (
    <ul className="timerListPlayer" style={players.length > 5 ? {gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))'}: null}>
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

const NotPlayers = ({errorNotPlayers}) => {

  return errorNotPlayers ?<p className="notPlayers" style={{color:"red"}}>Agregue jugadores para iniciar</p> : <p className="notPlayers">No hay jugadores agregados</p>;
};

export const Players = ({ players, playerId, timeBankToMinute, errorNotPlayers }) => {
  const hasPlayers =  players?.length > 0 

  return hasPlayers ? (
    <PlayersList
      players={players}
      playerId={playerId}
      timeBankToMinute={timeBankToMinute}
    />
  ) : (
    <NotPlayers errorNotPlayers={errorNotPlayers} />
  );
};
