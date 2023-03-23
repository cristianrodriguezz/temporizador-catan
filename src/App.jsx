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
  const nameInput = useRef();
  let id = useRef(-1);

  const handleChangeColor = (color) => {
    setColor(color);
  };
  const handleClickStartGame = () => {
    setRenderPlayer(true);
  };
  const handleChangeTime = (e) => {
    setTime(e.target.value)
  }

  const handleAddPlayer = (e) => {
    e.preventDefault();
    ++id.current;
    const minutes = minute.current.value === '' ? 0 : parseInt(minute.current.value)
    const seconds = second.current.value === '' ? 0 : parseInt(second.current.value)
    const timeBank = useMinuteToSecond(minutes,seconds)
    console.log(timeBank);
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
    console.log(minutesGame.current.value);

    const minutes = minutesGame.current.value === '' ? 0 : parseInt(minutesGame.current.value)
    const seconds = secondsGame.current.value === '' ? 0 : parseInt(secondsGame.current.value)

    setTime(useMinuteToSecond(minutes,seconds));
  };

  return renderPlayer ? (
    <Timer initialTime={time} players={players} />
  ) : (
    <div className="App">
      <h1>Temporizador para juegos de mesa</h1>
      <form onSubmit={handleSubmitTime}>
        <label>
          Tiempo de juego
          <label htmlFor="minutesGame">
            Minutos:
            <input
            onChange={handleChangeTime}
              type="number"
              id="minutesGame"
              name="minutesGame"
              min="0"
              max="59"
              ref={minutesGame}
            ></input>
          </label>
          <span>:</span>
          <label htmlFor="secondsGame">
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
          <label htmlFor="minutes">
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
          <label htmlFor="seconds">
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
