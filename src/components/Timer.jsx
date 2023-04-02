import React, { useEffect, useRef, useState } from "react";
import { Players } from "./Players";
import { useSecondsToString } from "../hooks/useSecondToMinute";
import { styleButtonsTimer } from "../constants/styleButtonsTimer";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay , faPause, faClockRotateLeft, faBackwardStep,faLockOpen,faLock} from "@fortawesome/free-solid-svg-icons";     
import soundFinishTime11 from "../assets/soundFinishTime1.wav"
import soundFinishTime12 from "../assets/soundFinishTime2.wav"
import soundFinishTimeGame1 from "../assets/soundFinishTimeGame1.wav"
import soundFinishTimeGame2 from "../assets/soundFinishTimeGame2.wav"
import soundPassTurn2 from "../assets/soundPassTurn2.wav"
import soundGeneralClick from "../assets/soundGeneralClick.wav"

const Timer = ({ initialTime, players, isStartGame }) => {
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

    const [isButtonsDisable, setIsButtonsDisable] = useState(true);

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
                if (timeGame === 1 && bankActualPlayer != 0) 
                  play(soundFinishTimeGame2);
            } else {
                setBankActualPlayer((prev) => prev - 1);
                setTimeBankToMinute(useSecondsToString(bankActualPlayer));
            }
            if (bankActualPlayer <= 0 && timeGame <= 0) {
              play(soundFinishTime12);
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
        play(soundGeneralClick);
    };

    const handleClickComebackTurn = () => {
        play(soundGeneralClick);
        setIsRun(true);
        setIsButtonsDisable(true);
        setIdPlayer(passedTurnIdPlayer);
        setTimeGame(passedTurnTime);
        setTimeGameToMinute(useSecondsToString(passedTurnTime));
        setIsComebackDisable(true);
    };

    const handleClickButtonsDisable = () => {
        play(soundGeneralClick);
        setIsButtonsDisable(!isButtonsDisable);
    };

    const hanldeClickReset = () => {
        play(soundGeneralClick);
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
        if (!(bankActualPlayer <= 0 && timeGame <= 0))
          play(soundPassTurn2);

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
        // const setVariablesPassedTurn = (timeGame) => {
        setPassedTurnIdPlayer(idPlayer);
        setPassedTurnTime(timeGame);
        setIsComebackDisable(false);
    };

    const setVariablesTimeGameToInicial = () => {
        setTimeGame(initialTime);
        setTimeGameToMinute(useSecondsToString(initialTime));
    };

    const play = (sound) => {
      new Audio(sound).play();
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
                    style={{
                        backgroundColor: player[idPlayer].color,
                        height: "auto",
                    }}
                >
                    <span
                        style={
                            timeGame > 0
                                ? {
                                      fontSize: "7rem",
                                      fontFamily: "'Inconsolata', monospace",
                                      fontWeight: 900,
                                      transition: "font-size 0.15s ease-in-out",
                                  }
                                : {
                                      fontSize: "4rem",
                                      fontFamily: "'Inconsolata', monospace",
                                      fontWeight: 900,
                                      transition: "font-size 1s ease-in-out",
                                  }
                        }
                    >
                        {timeGameToMinute}
                    </span>
                    <span
                        style={
                            timeGame > 0
                                ? {
                                      fontSize: "4rem",
                                      fontFamily: "'Inconsolata', monospace",
                                      fontWeight: 900,
                                      transition: "font-size 0.15s ease-in-out",
                                  }
                                : {
                                      fontSize: "7rem",
                                      fontFamily: "'Inconsolata', monospace",
                                      fontWeight: 900,
                                      transition: "font-size 1s ease-in-out",
                                  }
                        }
                    >
                        {timeBankToMinute}
                    </span>
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
                        <FontAwesomeIcon icon={faPause} style={{color: "#f5f5f5",}} />
                    ) : (
                        <FontAwesomeIcon icon={faPlay} style={{color: "#f5f5f5",}} />
                    )}
                </button>
                <button
                    onClick={hanldeClickReset}
                    disabled={isButtonsDisable}
                    style={styleButtonsTimer(isButtonsDisable)}
                >
                    <FontAwesomeIcon icon={faClockRotateLeft} style={{color: "#f5f5f5",}} />  
                </button>
                <button
                    onClick={handleClickComebackTurn}
                    disabled={isComebackDisable || isButtonsDisable}
                    style={styleButtonsTimer(
                        isComebackDisable || isButtonsDisable
                    )}
                >
                    <FontAwesomeIcon icon={faBackwardStep} style={{color: "#f5f5f5",}} />
                </button>
                <button
                    onClick={handleClickButtonsDisable}
                    style={styleButtonsTimer()}
                >
                    {isButtonsDisable ? 
                        <FontAwesomeIcon icon={faLock} style={{color: "#f5f5f5",}} />   
                         : 
                        <FontAwesomeIcon icon={faLockOpen} style={{color: "#f5f5f5",}} />
                    }
                </button>
            </div>
        </div>
    );
};

export default Timer;
