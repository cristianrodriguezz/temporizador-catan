import React, { useEffect, useRef, useState } from "react";
import { Players } from "./Players";
import { useSecondsToString } from "../hooks/useSecondToMinute";

const Timer = ({ initialTime, players }) => {
  const [timeGame, setTimeGame] = useState(initialTime);
  const [player, setPlayer] = useState(players);
  const [isRun, setIsRun] = useState(false);
  const [isFirstTurn, setIsFirstTurn] = useState(true);
  const [isComeback, setIsComeback] = useState(false);

  const idP = useRef(player.length - 1)
  const [idPlayer,setIdPlayer] = useState(0)
  const [bankActualPlayer, setBankActualPlayer] = useState(player[idPlayer]?.timerBank);
  const [timeGameToMinute, setTimeGameToMinute] = useState(useSecondsToString(timeGame))
  const [timeBankToMinute, setTimeBankToMinute] = useState(useSecondsToString(bankActualPlayer))



  useEffect(() => {

    setBankActualPlayer(player[idPlayer]?.timerBank)
    setTimeBankToMinute(useSecondsToString(bankActualPlayer))

  }, [idPlayer, player])
  


  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      if (isRun) {
        if (timeGame <= 0) {
          setBankActualPlayer((prev) => prev - 1);
          setTimeBankToMinute(useSecondsToString(bankActualPlayer))
        } else {
          setTimeGame((prev) => prev - 1);
          setTimeGameToMinute(useSecondsToString(timeGame - 1))
        }
        if (bankActualPlayer <= 0 && timeGame <= 0) {
          hanldeClickNextTurn();
        }
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [timeGame, isRun, idPlayer, bankActualPlayer, player, idP, timeGameToMinute, timeBankToMinute]);

  const handleClickStart = () => {
    setIsRun(!isRun);
  };
  const hanldeClickReset = () => {
    setTimeGame(initialTime);
    setIsRun(true);
  };
  const hanldeClickNextTurn = () => {
    if (!isRun) {
      setIsRun(true);
      return
    }
    setTimeGame(initialTime);
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
    setIdPlayer(id);
    setBankActualPlayer(player[id].timerBank);
    setTimeBankToMinute(useSecondsToString(bankActualPlayer))
    updateBankPlayer(idPlayer, bankActualPlayer);
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
    <div>
      <button className="game" onClick={hanldeClickNextTurn}>
        <div style={{ backgroundColor: player[idPlayer].color }}>
          <span style={{ fontSize : "175px", fontFamily: "'Inconsolata', monospace", fontWeight: 900}}>{timeGameToMinute}</span> 
          <br />
          <span style={{ fontSize : "60px", fontFamily: "'Inconsolata', monospace", fontWeight: 900}}>{timeBankToMinute}</span>
        </div>
        <Players players={player} timeBankToMinute={timeBankToMinute} />
      </button>
      <div className="buttonsGame">
        <button onClick={handleClickStart}>{isRun ? "Resume" : "Start"}</button>
        <button onClick={hanldeClickReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
