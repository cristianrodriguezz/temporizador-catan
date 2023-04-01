import React, { useContext } from "react";
import { useSecondsToString } from "../hooks/useSecondToMinute";
import { stylePlayerSelected } from "../constants/stylePlayerSelected";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import IconGripper from "../icons/IconGripper";
import { Context } from "../Contexts/ContextProvider";
import { colors } from "../constants/color";

const PlayersList = ({
  players,
  playerId,
  timeBankToMinute,
  setPlayers,
  isStartGame,
}) => {
  const [renderPlayerToDelete, setRenderPlayerToDelete] = useState(true);
  const { setColorsDeletes } = useContext(Context);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = [...players];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setPlayers(newItems);
  };
  const handleClickDeletePlayer = (idPlayer) => {
    const playerList = players;
    const playerDelete = playerList.filter((player) => player.id === idPlayer);
    playerList.splice(idPlayer, 1);
    
    playerList.forEach(function (player, index) {
      player.id = index;
    });

    const colorDelete = colors.filter(
      (color) => playerDelete[0].color === color.value
    );

    setColorsDeletes(colorDelete);

    setPlayers(playerList);
    setRenderPlayerToDelete(!renderPlayerToDelete);
  };
  useEffect(() => {}, [renderPlayerToDelete]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="players">
        {(droppableProvided) => (
          <ul
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            className="timerListPlayer"
            style={
              players.length > 5 && isStartGame
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
                isDragDisabled={isStartGame}
              >
                {(draggableProvided) => (
                  <li
                    {...draggableProvided.draggableProps}
                    ref={draggableProvided.innerRef}
                  >
                    <AnimatePresence>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="player"
                        style={stylePlayerSelected(
                          player,
                          playerId,
                          isStartGame
                        )}
                      >
                        {isStartGame ? null : (
                          <div
                            style={{ display: "grid", placeItems: "center" }}
                          >
                            <button
                              style={{ background: "none" }}
                              onClick={() => handleClickDeletePlayer(player.id)}
                            >
                              X
                            </button>
                          </div>
                        )}

                        <div>
                          <p style={{ fontSize: "2rem" }}>
                            {playerId === player.id
                              ? timeBankToMinute
                              : useSecondsToString(player.timerBank)}
                          </p>
                          <p>{player.name}</p>
                        </div>
                        {isStartGame ? null : (
                          <div
                            style={{ display: "grid", placeItems: "center" }}
                            {...draggableProvided.dragHandleProps}
                          >
                            <IconGripper />
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
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
  isStartGame,
}) => {
  const hasPlayers = players?.length > 0;

  return hasPlayers ? (
    <PlayersList
      setPlayers={setPlayers}
      players={players}
      playerId={playerId}
      timeBankToMinute={timeBankToMinute}
      isStartGame={isStartGame}
    />
  ) : (
    <NotPlayers errorNotPlayers={errorNotPlayers} />
  );
};
