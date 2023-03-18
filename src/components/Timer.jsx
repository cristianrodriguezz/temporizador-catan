import React, { useEffect, useRef, useState } from "react";
import { Players } from "./Players";

const Timer = ({ initialTime, players }) => {
  const [timeGame, setTimeGame] = useState(initialTime);
  const [player, setPlayer] = useState(players);
  const [isRun, setIsRun] = useState(false);
  const idP = useRef(player.length - 1)
  const [idPlayer,setIdPlayer] = useState(0)

  const [bankActualPlayer, setBankActualPlayer] = useState(player[idPlayer]?.timerBank);
  const [bankA, setBankA] = useState(bankActualPlayer)




  //AL DAR LA VUELTA SE CAMBIA EL VALOR: bankActualPlayer DEL BANCO DE TIEMPO A UNDEFINED
  useEffect(() => {
    let interval = null;


    interval = setInterval(() => {
      if (isRun) {
        if (timeGame <= 0) {
          setBankActualPlayer((prev) => prev - 1);
        } else {
          setTimeGame((prev) => prev - 1);
        }
        if (bankActualPlayer <= 0 && timeGame <= 0 ) {
          hanldeClickNextTurn()
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [timeGame, isRun, idPlayer, bankActualPlayer, player, idP]);

  const handleClickStart = () => {
    setIsRun(!isRun);
  };
  const hanldeClickReset = () => {
    setTimeGame(initialTime);
  };
  const hanldeClickNextTurn = () => {
    setTimeGame(initialTime);
    let id = idPlayer
    //setIsRun(true);
  

      if (idP.current === idPlayer) {
        setIdPlayer(0);
        id = 0
      }
      else{
        id = idPlayer + 1
        setIdPlayer(idPlayer + 1)
      }


    setBankActualPlayer(player[id].timerBank);
    updateBankPlayer(idPlayer, bankActualPlayer );
  };

  const updateBankPlayer = (playerId, bankAP ) => {
    const newBankTimePlayer = player.map((player) => {
      if (player.id=== (playerId)) {
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
      <Players players={player} />
      Tiempo de juego: {timeGame}. Tiempo del banco: {bankActualPlayer}
      <button onClick={handleClickStart}>{isRun ? "Resume" : "Start"}</button>
      <button onClick={hanldeClickReset}>Reset</button>
      <button onClick={hanldeClickNextTurn}>Next turn</button>
      idplayer: {idPlayer}  idP:{idP.current}
    </div>
  );
};

export default Timer;
