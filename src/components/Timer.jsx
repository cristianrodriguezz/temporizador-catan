import React, { useEffect, useRef, useState } from "react";
import { Players } from "./Players";
import { useSecondsToString } from "../hooks/useSecondToMinute";
import { styleButtonsTimer } from "../constants/styleButtonsTimer";
import { play } from "../constants/sounds";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFullscreen, useToggle } from "react-use";
import {
  faPlay,
  faPause,
  faClockRotateLeft,
  faBackwardStep,
  faLockOpen,
  faLock,
  faHouseChimneyWindow,
  faMaximize,
  faMinimize
} from "@fortawesome/free-solid-svg-icons";
import {
  styleTimerTurn,
  styleTimerBank,
  styleTimerPlay,
  overridePosition,
} from "../constants/styleTimer";





const Timer = ({ initialTime, players, isStartGame, setIsStartGame, isFirstTurn, setIsFirstTurn }) => {
  const [timeGame, setTimeGame] = useState(initialTime);
  const [timeGameToMinute, setTimeGameToMinute] = useState(
    useSecondsToString(timeGame)
  );
  console.log(isFirstTurn);
  const ref = useRef(null);
  const [show, setToggle] = useState(false);
  const [player, setPlayer] = useState(players);
  const [isRun, setIsRun] = useState(false);
  const [isComeback, setIsComeback] = useState(false);
  const [totalTimeGame, setTotalTimeGame] = useState(0);
  const [totalTimeGameToMinute, setTotalTimeGameToMinute] = useState(
    useSecondsToString(totalTimeGame)
  );
  const idP = useRef(player.length - 1);
  const [idPlayer, setIdPlayer] = useState(0);
  const [turnNumber, setTurnNumber] = useState(1);
  const [bankActualPlayer, setBankActualPlayer] = useState(
    player[idPlayer]?.timerBank
  )
  const [timeBankToMinute, setTimeBankToMinute] = useState(
    useSecondsToString(bankActualPlayer)
  )


  const [passedTurnTime, setPassedTurnTime] = useState(initialTime);
  const [passedTurnIdPlayer, setPassedTurnIdPlayer] = useState(idPlayer);
  const [isComebackDisable, setIsComebackDisable] = useState(true);

  const [isButtonsDisable, setIsButtonsDisable] = useState(true);

  useEffect(() => {
    setBankActualPlayer(player[idPlayer]?.timerBank);
    setTimeBankToMinute(useSecondsToString(player[idPlayer]?.timerBank));
  }, [idPlayer, player]);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setToggle(!show)
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setToggle(!show)
    }
  }
  

  useEffect(() => {
    let interval = null;


    interval = setInterval(() => {
      if (!isRun) return

      if (timeGame > 0) {
        setTimeGame((prev) => prev - 1);
        setTimeGameToMinute(useSecondsToString(timeGame - 1));
        if (timeGame === 1 && bankActualPlayer != 0)
          play("soundFinishTimeGame2");

        if (bankActualPlayer <= 0 && timeGame - 1 <= 0) {
          play("soundFinishTime12");
          hanldeClickNextTurn();
        }
      } else {
        setBankActualPlayer((prev) => prev - 1);
        setTimeBankToMinute(useSecondsToString(bankActualPlayer - 1));
        if (bankActualPlayer <= 0 && timeGame <= 0) {
          play("soundFinishTime12");
          hanldeClickNextTurn();
        }
      }
      setTotalTimeGame((prev) => prev + 1);
      setTotalTimeGameToMinute(useSecondsToString(totalTimeGame + 1));
    }, 1000);

    return () =>{ 
      clearInterval(interval)
    }
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
    play("soundGeneralClick");
  };

  const handleClickComebackTurn = () => {
    play("soundGeneralClick");
    setIsRun(true);
    setIsButtonsDisable(true);
    if (idPlayer === passedTurnIdPlayer) {
      setIsFirstTurn(true);
      if (idPlayer != 0) {
        setIsComeback(false);
      }
    }
    setIdPlayer(passedTurnIdPlayer);
    setTimeGame(passedTurnTime);
    setTimeGameToMinute(useSecondsToString(passedTurnTime));
    setIsComebackDisable(true);
    if (idPlayer === 0) {
      setTurnNumber(turnNumber - 1);
    }
  };

  const handleClickButtonsDisable = () => {
    play("soundGeneralClick");
    setIsButtonsDisable(!isButtonsDisable);
  };

  const hanldeClickReset = () => {
    play("soundGeneralClick");
    let id = idPlayer;
    setIsButtonsDisable(true);
    setVariablesTimeGameToInicial();
    setBankActualPlayer(player[id].timerBank);
    setTimeBankToMinute(useSecondsToString(player[id].timerBank));
    setIsRun(true);
  };

  const hanldeClickNextTurn = () => {
    if (!isRun) {
      handleClickStart();
      return;
    }

    let notPassTurn = false;
    let segPrev = 1;
    notPassTurn = !notPassTurn
      ? timeGame > initialTime - segPrev && initialTime != 0
      : notPassTurn;
    notPassTurn =
      !notPassTurn && initialTime === 0
        ? bankActualPlayer > player[idPlayer]?.timerBank - segPrev &&
          player[idPlayer]?.timerBank != 0
        : notPassTurn;
    if (notPassTurn) {
      return;
    }

    // Almacena informacion para handleClickComebackTurn
    setVariablesPassedTurn();
    // Reinicia timer de turno
    setVariablesTimeGameToInicial();
    // Bloquea los botones
    setIsButtonsDisable(true);

    let id = idPlayer;
    if (!(bankActualPlayer <= 0 && timeGame <= 0)) play("soundPassTurn2");

    if (!isFirstTurn) {
      if (idP.current === idPlayer) {
        id = 0;
        setTurnNumber(turnNumber + 1);
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
            setTurnNumber(1);
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

  const setVariablesPassedTurn = () => {
    setPassedTurnIdPlayer(idPlayer);
    setPassedTurnTime(timeGame);
    setIsComebackDisable(false);
  };

  const setVariablesTimeGameToInicial = () => {
    setTimeGame(initialTime);
    setTimeGameToMinute(useSecondsToString(initialTime));
  };

  return (
    <div className="containerStartGame" ref={ref} style={{backgroundColor:'#000000'}} id="outer-container">
      
      <motion.button
        whileTap={{ scale: 0.99 }}
        className="game"
        onClick={hanldeClickNextTurn}
      >
        <div
          className="timer"
          style={{
            backgroundColor: player[idPlayer].color,
            height: "11.5rem",
            position: "relative",
          }}
        >
          <div>
            {!isRun ? (
              <div style={{ opacity: 0.7 }}>
                <FontAwesomeIcon
                  icon={faPlay}
                  style={styleTimerPlay(
                    initialTime,
                    timeGame,
                    bankActualPlayer
                  )}
                />
              </div>
            ) : null}
          </div>
          <span style={styleTimerTurn(initialTime, timeGame, bankActualPlayer)}>
            {timeGameToMinute}
          </span>
          <div>
            <span
              style={styleTimerBank(initialTime, timeGame, bankActualPlayer)}
            >
              {timeBankToMinute}
            </span>
          </div>
          <div style={overridePosition(375, 270, 10, 10)}>
            {isFirstTurn ? (
              <FontAwesomeIcon icon={faHouseChimneyWindow} />
            ) : (
              turnNumber
            )}
          </div>
          <div
            style={{
              ...overridePosition(-470, 300, 10, 10),
              fontSize: "25px",
              color: "#f5f5f566",
            }}
          >
            {totalTimeGameToMinute}
          </div>
        </div>
        <Players
          players={player}
          playerId={idPlayer}
          timeBankToMinute={timeBankToMinute}
          isStartGame={isStartGame}
        />
      </motion.button>
      <div className="buttonsGame">
        <button onClick={handleClickStart} style={styleButtonsTimer()}>
          {isRun ? (
            <FontAwesomeIcon icon={faPause} style={{ color: "#f5f5f5" }} />
          ) : (
            <FontAwesomeIcon icon={faPlay} style={{ color: "#f5f5f5" }} />
          )}
        </button>
        <button
          onClick={hanldeClickReset}
          disabled={isButtonsDisable}
          style={styleButtonsTimer(isButtonsDisable)}
        >
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            style={{ color: "#f5f5f5" }}
          />
        </button>
        <button
          onClick={handleClickComebackTurn}
          disabled={isComebackDisable || isButtonsDisable}
          style={styleButtonsTimer(isComebackDisable || isButtonsDisable)}
        >
          <FontAwesomeIcon icon={faBackwardStep} style={{ color: "#f5f5f5" }} />
        </button>
        <button
          disabled={isButtonsDisable}
          style={styleButtonsTimer(isButtonsDisable)}
          onClick={() =>
            setIsStartGame(
              !confirm("¿Desea volver atrás?. Perderá todos los tiempos")
            )
          }
        >
          Set
        </button>
        <button >{!show ? <FontAwesomeIcon onClick={toggleFullScreen} style={styleButtonsTimer()} icon={faMaximize} /> : <FontAwesomeIcon onClick={toggleFullScreen} icon={faMinimize} style={styleButtonsTimer()}/> }</button>
        <button onClick={handleClickButtonsDisable} style={styleButtonsTimer()}>
          {isButtonsDisable ? (
            <FontAwesomeIcon icon={faLock} style={{ color: "#f5f5f5" }} />
          ) : (
            <FontAwesomeIcon icon={faLockOpen} style={{ color: "#f5f5f5" }} />
          )}
        </button>
      
        
      </div>
    </div>
  );
};

export default Timer;
