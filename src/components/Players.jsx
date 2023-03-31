import React from "react";
import { useSecondsToString } from "../hooks/useSecondToMinute";
import { stylePlayerSelected } from "../constants/stylePlayerSelected";
import { motion } from "framer-motion";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import IconGripper from "../icons/IconGripper";

const PlayersList = ({
  players,
  playerId,
  timeBankToMinute,
  setPlayers,
  renderPlayer,
}) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = [...players];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setPlayers(newItems);
  };
  console.log(renderPlayer);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="players">
        {(droppableProvided) => (
          <ul
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            className="timerListPlayer"
            style={
              players.length > 5
                ? {
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))",
                  }
                : null
            }
          >
            {players?.map((player, index) => (
              <Draggable
                key={player.id}
                draggableId={player.id.toString()}
                index={index}
                isDragDisabled={renderPlayer}
              >
                {(draggableProvided) => (
                  <li
                    {...draggableProvided.draggableProps}
                    ref={draggableProvided.innerRef}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="player"
                      style={stylePlayerSelected(player, playerId, renderPlayer)}
                    >
                      <div>
                        <p style={{ fontSize: "2rem" }}>
                          {playerId === player.id
                            ? timeBankToMinute
                            : useSecondsToString(player.timerBank)}
                        </p>
                        <p>{player.name}</p>
                      </div>
                      {renderPlayer ? null : (
                        <div
                          style={{ display: "grid", placeItems: "center" }}
                          {...draggableProvided.dragHandleProps}
                        >
                          <IconGripper />
                        </div>
                      )}
                    </motion.div>
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const NotPlayers = ({ errorNotPlayers }) => {
  return errorNotPlayers ? (
    <p className="notPlayers" style={{ color: "red" }}>
      Agregue jugadores para iniciar
    </p>
  ) : (
    <p className="notPlayers">No hay jugadores agregados</p>
  );
};

export const Players = ({
  players,
  playerId,
  timeBankToMinute,
  errorNotPlayers,
  setPlayers,
  renderPlayer,
}) => {
  const hasPlayers = players?.length > 0;

  return hasPlayers ? (
    <PlayersList
      setPlayers={setPlayers}
      players={players}
      playerId={playerId}
      timeBankToMinute={timeBankToMinute}
      renderPlayer={renderPlayer}
    />
  ) : (
    <NotPlayers errorNotPlayers={errorNotPlayers} />
  );
};
