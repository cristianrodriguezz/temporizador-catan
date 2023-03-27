import React, { useEffect, useRef, useState } from "react";
import { Players } from "./Players";
import { useSecondsToString } from "../hooks/useSecondToMinute";
import { motion } from "framer-motion";

const Timer = ({ initialTime, players }) => {
  const [timeGame, setTimeGame] = useState(initialTime);
  const [player, setPlayer] = useState(players);
  const [isRun, setIsRun] = useState(false);
  const [isFirstTurn, setIsFirstTurn] = useState(true);
  const [isComeback, setIsComeback] = useState(false);

  const idP = useRef(player.length - 1);
  const [idPlayer, setIdPlayer] = useState(0);
  const [bankActualPlayer, setBankActualPlayer] = useState(
    player[idPlayer]?.timerBank
  );
  const [timeGameToMinute, setTimeGameToMinute] = useState(
    useSecondsToString(timeGame)
  );
  const [timeBankToMinute, setTimeBankToMinute] = useState(
    useSecondsToString(bankActualPlayer)
  );

  const [passedTurnTime, setPassedTurnTime] = useState(initialTime);
  const [passedTurnIdPlayer, setPassedTurnIdPlayer] = useState(idPlayer);
  const [isComebackDisable, setIsComebackDisable] = useState(true);

  useEffect(() => {
    setBankActualPlayer(player[idPlayer]?.timerBank);
    setTimeBankToMinute(useSecondsToString(player[idPlayer]?.timerBank));
  }, [idPlayer, player]);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      if (!isRun) {
        return;
      }
      if (timeGame > 0) {
        setTimeGame((prev) => prev - 1);
        setTimeGameToMinute(useSecondsToString(timeGame - 1));
      } else {
        setBankActualPlayer((prev) => prev - 1);
        setTimeBankToMinute(useSecondsToString(bankActualPlayer));
      }
      if (bankActualPlayer <= 0 && timeGame <= 0) {
        hanldeClickNextTurn();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    timeGame,
    isRun,
    idPlayer,
    bankActualPlayer,
    player,
    idP,
    timeGameToMinute,
    timeBankToMinute,
  ]);

  const handleClickStart = () => {
    setIsRun(!isRun);
  };

  const handleClickComebackTurn = () => {
    setIsRun(true);
    setIdPlayer(passedTurnIdPlayer);
    setTimeGame(passedTurnTime);
    setTimeGameToMinute(useSecondsToString(passedTurnTime));
    setIsComebackDisable(true);
  };

  const hanldeClickReset = () => {
    let id = idPlayer;
    setTimeGame(initialTime);
    setTimeGameToMinute(useSecondsToString(initialTime));
    setBankActualPlayer(player[id].timerBank);
    setTimeBankToMinute(useSecondsToString(player[id].timerBank));
    setIsRun(true);
  };
  const hanldeClickNextTurn = () => {
    if (!isRun) {
      setIsRun(true);
      return;
    }
    // Almacena informacion para handleClickComebackTurn
    setPassedTurnIdPlayer(idPlayer);
    setPassedTurnTime(timeGame);
    setIsComebackDisable(false);

    setTimeGame(initialTime);

    setTimeGameToMinute(useSecondsToString(initialTime));
    let id = idPlayer;

    if (!isFirstTurn) {
      if (idP.current === idPlayer) {
        id = 0;
      } else {
        id = idPlayer + 1;
      }
    } else {
      if (idP.current === idPlayer && !isComeback) {
        if (!isComeback) {
          console.log("isComeback ::" + isComeback);
          id = idPlayer;
          setIsComeback(true);
        }
      } else {
        if (isComeback) {
          id = idPlayer - 1;
          if (id === -1) {
            id = 0;
            setIsFirstTurn(false);
          }
        } else {
          id = idPlayer + 1;
        }
      }
    }
    updateBankPlayer(idPlayer, bankActualPlayer);
    setIdPlayer(id);
    setBankActualPlayer(player[id].timerBank);
    setTimeBankToMinute(useSecondsToString(bankActualPlayer));
  };

  const updateBankPlayer = (playerId, bankAP) => {
    const newBankTimePlayer = player.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          timerBank: bankAP,
        };
      }
      return player;
    });
    setPlayer(newBankTimePlayer);
  };

  return (
    <div className="containerStartGame">
      <motion.button
        whileTap={{ scale: 0.99 }}
        className="game"
        onClick={hanldeClickNextTurn}
      >
        <div
          className="timer"
          style={{ backgroundColor: player[idPlayer].color }}
        >
          <span>{timeGameToMinute}</span>
          <span>{timeBankToMinute}</span>
        </div>
        <Players
          players={player}
          playerId={idPlayer}
          timeBankToMinute={timeBankToMinute}
        />
      </motion.button>
      <div className="buttonsGame">
        <button onClick={handleClickStart}>{isRun ? "Pause" : "Start"}</button>
        <button onClick={hanldeClickReset}>Reset</button>
        <button
          onClick={handleClickComebackTurn}
          disabled={isComebackDisable}
          style={!isComebackDisable ? {} : { opacity: 0.25 }}
        >
          Previous Turn
        </button>
      </div>
    </div>
  );
};

export default Timer;
