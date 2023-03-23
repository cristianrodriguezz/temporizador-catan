import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import SelectColor from "./components/SelectColor";
import Timer from "./components/Timer";
import { useMinuteToSecond } from "./hooks/useSecondToMinute";

function App() {
  const [players, setPlayers] = useState([]);
  const [color, setColor] = useState();
  const [time, setTime] = useState();
  const [renderPlayer, setRenderPlayer] = useState(false);
  const minutesGame = useRef();
  const secondsGame = useRef();
  const minute = useRef();
  const second = useRef();

  const timer = useRef();

  const nameInput = useRef();
  let id = useRef(-1);

  const handleChangeColor = (color) => {
    setColor(color);
  };
  const handleClickStartGame = () => {
    setRenderPlayer(true);
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
    ++id.current;
    const minutes = parseInt(minute.current.value)
    const seconds = parseInt(second.current.value)
    const timeBank = useMinuteToSecond(minutes,seconds)
    setPlayers([
      ...players,
      {
        id: id.current,
        name: nameInput.current.value,
        color: color,
        timerBank: timeBank,
        isActive: false,
      },
    ]);
  };
 
  const handleSubmitTime = (e) => {
    e.preventDefault();
    const minute = parseInt(minutesGame.current.value)
    const second = parseInt(secondsGame.current.value)
    setTime(useMinuteToSecond(minute,second));
  };

  return renderPlayer ? (
    <Timer initialTime={time} players={players} />
  ) : (
    <div className="App">
      <h1>Temporizador para juegos de mesa</h1>
      <form onSubmit={handleSubmitTime}>
        <label>
          Tiempo de juego
          <label for="minutesGame">
            Minutos:
            <input
              type="number"
              id="minutesGame"
              name="minutesGame"
              min="0"
              max="59"
              ref={minutesGame}
            ></input>
          </label>
          <span>:</span>
          <label for="secondsGame">
            Segundos:
            <input
              ref={secondsGame}
              type="number"
              id="secondsGame"
              name="secondsGame"
              min="0"
              max="59"
            ></input>
          </label>
        </label>
        <button>Enter</button>
      </form>
      <form onSubmit={handleAddPlayer}>
        <SelectColor color={handleChangeColor} />
        <label>
          Jugador
          <input type="text" id="name" ref={nameInput} />
        </label>
        <label>
          Tiempo del banco
          <label for="minutes">
            Minutos:
            <input
              type="number"
              id="minutes"
              name="minutes"
              min="0"
              max="59"
              ref={minute}
            ></input>
          </label>
          <span>:</span>
          <label for="seconds">
            Segundos:
            <input
              ref={second}
              type="number"
              id="seconds"
              name="seconds"
              min="0"
              max="59"
            ></input>
          </label>
        </label>
        <p>Jugadores: {players.length}</p>
        <button>Agregar</button>
      </form>
      <button onClick={handleClickStartGame}>Empezar juego</button>
    </div>
  );
}
export default App;
