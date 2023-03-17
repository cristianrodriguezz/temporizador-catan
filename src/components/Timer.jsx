import React, { useEffect, useRef, useState } from "react";

const Timer = ({ initialTime, players }) => {
  const [timeGame, setTimeGame] = useState(initialTime);
  const [player, setPlayer] = useState(players);
  let bankActualPlayer = useRef(player[0]?.timerBank);
  const [bankPlayer, setBankPlayer] = useState(bankActualPlayer.current);
  const [isRun, setIsRun] = useState(false);
  const idPlayer = useRef(player.length)

  useEffect(() => {
    let interval = null;
    console.log(player);
    console.log(`Tiempo del banco: ${bankActualPlayer.current}`);

    interval = setInterval(() => {
      if (isRun) {
        setTimeGame((prev) => prev - 1);
      }
      if (timeGame <= 0) {
        setBankPlayer((prev) => prev - 1)
      }
    }, 500);

    return () => clearInterval(interval);
  }, [timeGame, isRun, idPlayer]);

  const handleClickStart = () => {
    setIsRun(!isRun);
  };
  const hanldeClickReset = () => {
    setTimeGame(initialTime);
  };
  const hanldeClickNextTurn = () => {
    setTimeGame(initialTime);
    setIsRun(true)
    idPlayer.current === player.length ? idPlayer.current = 0 : idPlayer.current += 1
    handleUpdatePlayer(idPlayer.current);
    bankActualPlayer.current = player[idPlayer.current]?.timerBank
  };


  const handleUpdatePlayer = (playerId) => {
    const newBankTimePlayer = player.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          timerBank: bankActualPlayer.current,
        };
      }
      return player;
    });
    setPlayer(newBankTimePlayer);
  };

  return (
    <div>
      Tiempo de juego: {timeGame}. Tiempo del banco: {bankPlayer}
      <button onClick={handleClickStart}>{isRun ? "Resume" : "Start"}</button>
      <button onClick={hanldeClickReset}>Reset</button>
      <button onClick={hanldeClickNextTurn}>Next turn</button>
      {idPlayer.current}
    </div>
  );
};

export default Timer;
