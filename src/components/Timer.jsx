import React, { useEffect, useRef, useState } from "react";
import { Players } from "./Players";
import { useSecondsToString } from "../hooks/useSecondToMinute";
import { styleButtonsTimer } from "../constants/styleButtonsTimer";
import { motion } from "framer-motion";

const Timer = ({ initialTime, players, renderPlayer, setRenderPlayer }) => {
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
  
  const [passedTurnTime, setPassedTurnTime] = useState(initialTime)
  const [passedTurnIdPlayer, setPassedTurnIdPlayer] = useState(idPlayer)
  const [isComebackDisable, setIsComebackDisable] = useState(true)
  
  const [isButtonsDisable, setIsButtonsDisable] = useState(true)
  

  useEffect(() => {

    setBankActualPlayer(player[idPlayer]?.timerBank)
    setTimeBankToMinute(useSecondsToString(player[idPlayer]?.timerBank));

  }, [idPlayer, player])
  

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      if (!isRun) {
        return
      }
      if (timeGame > 0) {
        setTimeGame((prev) => prev - 1);
        setTimeGameToMinute(useSecondsToString(timeGame - 1))
      } else {
        setBankActualPlayer((prev) => prev - 1);
        setTimeBankToMinute(useSecondsToString(bankActualPlayer))
      }
      if (bankActualPlayer <= 0 && timeGame <= 0) {
        hanldeClickNextTurn();
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeGame, isRun, idPlayer, bankActualPlayer, player, idP, timeGameToMinute, timeBankToMinute]);

  const handleClickStart = () => {
    setIsRun(!isRun);
  };

  const handleClickComebackTurn = () => {
    setIsRun(true);
    setIsButtonsDisable(true);
    setIdPlayer(passedTurnIdPlayer);
    setTimeGame(passedTurnTime);
    setTimeGameToMinute(useSecondsToString(passedTurnTime));
    setIsComebackDisable(true);
  };

  const handleClickButtonsDisable = () => {
    setIsButtonsDisable(!isButtonsDisable);
  };

  const hanldeClickReset = () => {
    let id = idPlayer;
    setIsButtonsDisable(true);
    setVariablesTimeGameToInicial();
    setBankActualPlayer(player[id].timerBank);
    setTimeBankToMinute(useSecondsToString(player[id].timerBank))
    setIsRun(true);
  };

  const hanldeClickNextTurn = () => {
    if (!isRun) {
      setIsRun(true);
      return
    }

    let notPassTurn = false;
    let segPrev = 1;
    notPassTurn = !notPassTurn ? (timeGame > (initialTime-segPrev) && initialTime != 0) : notPassTurn;
    notPassTurn = !notPassTurn && initialTime === 0 ? (bankActualPlayer > (player[idPlayer]?.timerBank-segPrev) && player[idPlayer]?.timerBank != 0) : notPassTurn;
    if (notPassTurn) {
      return
    }

    // Almacena informacion para handleClickComebackTurn
    setVariablesPassedTurn();
    // Reinicia timer de turno
    setVariablesTimeGameToInicial();
    // Bloquea los botones
    setIsButtonsDisable(true);

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
    setTimeBankToMinute(useSecondsToString(bankActualPlayer))
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

  const setVariablesPassedTurn = () => {
  // const setVariablesPassedTurn = (timeGame) => {
    setPassedTurnIdPlayer(idPlayer);
    setPassedTurnTime(timeGame);
    setIsComebackDisable(false);
  };
  
  const setVariablesTimeGameToInicial = () => {
    setTimeGame(initialTime);
    setTimeGameToMinute(useSecondsToString(initialTime));
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
          style={{ backgroundColor: player[idPlayer].color,
            height : 'auto'
          }}
        >
          <span 
            style={
              timeGame > 0 ? { fontSize : "6rem", fontFamily: "'Inconsolata', monospace", fontWeight: 900, transition: "font-size 0.15s ease-in-out"}:
              { fontSize : "4rem", fontFamily: "'Inconsolata', monospace", fontWeight: 900, transition: "font-size 1s ease-in-out"}
            }>{timeGameToMinute}
          </span> 
          <span 
            style={
              timeGame > 0 ? { fontSize : "4rem", fontFamily: "'Inconsolata', monospace", fontWeight: 900, transition: "font-size 0.15s ease-in-out"}:
              { fontSize : "6rem", fontFamily: "'Inconsolata', monospace", fontWeight: 900, transition: "font-size 1s ease-in-out"}
            }>{timeBankToMinute}
          </span>
        </div>
        <Players
          players={player}
          playerId={idPlayer}
          timeBankToMinute={timeBankToMinute}
          renderPlayer={renderPlayer}
        />
      </motion.button>
      <div className="buttonsGame">
        <button
          onClick={handleClickStart}
          style={styleButtonsTimer()}
        >
          {isRun ?
          <img style={{ width: '5rem', height: '5rem' }} src="./public/buttonPause.svg" alt="Pause" />
          : <img style={{ width: '5rem', height: '5rem' }} src="./public/buttonPlay.svg" alt="Play" />}
        </button>
        <button 
          onClick={hanldeClickReset}
          disabled={isButtonsDisable}
          style={styleButtonsTimer(isButtonsDisable)}
        >
          <img style={{ width: '5rem', height: '5rem' }} src="./public/buttonReset.svg" alt="Reset" />
        </button>
        <button
          onClick={handleClickComebackTurn}
          disabled={isComebackDisable || isButtonsDisable}
          style={styleButtonsTimer((isComebackDisable || isButtonsDisable))}
        >
          <img style={{ width: '5rem', height: '5rem' }} src="./public/buttonComebackTurn.svg" alt="Previous Turn" />
        </button>
        <button
          onClick={handleClickButtonsDisable}
          style={styleButtonsTimer()}
        >
          { isButtonsDisable ?
          <img style={{ width: '5rem', height: '5rem' }} src="./public/buttonUnlock.svg" alt="Unlocked" />
          :<img style={{ width: '5rem', height: '5rem' }} src="./public/buttonLock.svg" alt="Locked" />
        }
        </button>
        <button onClick={() => setRenderPlayer(false)}>Volver</button>
      </div>
    </div>
  );
};

export default Timer;
