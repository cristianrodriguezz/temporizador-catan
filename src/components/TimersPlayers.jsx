import { useEffect, useRef, useState } from "react";
import { useSecondsToString } from "../hooks/useSecondToMinute";

export const TimerGame = ({ initialTime, bankTime, players }) => {
  const [seconds, setSeconds] = useState(initialTime);
  const [bankOfTime, setBankOfTime] = useState(bankTime);
  const [isStart, setIsStart] = useState(false);
  const secondsToMinute = useSecondsToString(bankOfTime);
  const [isTurnFinished, setIsTurnFinished] = useState(false);


  useEffect(() => {
    let interval = null;

    if (isStart) {
      interval = setInterval(() => {
        if (seconds === 0) {
          setBankOfTime((prev) => prev - 1);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 100);
    }
    if (bankOfTime === 0 && seconds === 0) {
      setIsTurnFinished(true);
      clearInterval(interval);
      setIsStart(false);
    }

    return () => clearInterval(interval);
  }, [isStart, seconds, initialTime, bankOfTime]);

  const handleStart = () => {
    setIsStart(true);
  };

  const handleReset = () => {
    setSeconds(initialTime);
    setIsStart(false);
  };

  const handlePause = () => {
    setIsStart(false);
  };

  const handleNextTurn = () => {
    setIsTurnFinished(!isTurnFinished);
    setSeconds(initialTime);
  };

  return (
    <div>
      <p>{seconds}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleNextTurn}>Next turn</button>
      <p>{bankOfTime}</p>
    </div>
  );
};

const TimerList = ({ players, initialTime }) => {
  return (
    <ul>
      {players?.map((player) => (
        <TimerGame
          players={players}
          bankTime={player.timerBank}
          key={player.id}
          initialTime={initialTime}
        />
      ))}
    </ul>
  );
};

export const TimersPlayers = ({ players, initialTime }) => {
  const hasPlayers = players?.length > 0;
  return hasPlayers ? (
    <TimerList players={players} initialTime={initialTime} />
  ) : (
    <p>Seleccioná el tiempo de juego</p>
  );
};
