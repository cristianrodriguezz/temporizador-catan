import "./App.css";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import SelectColor from "./components/SelectColor";
import Timer from "./components/Timer";
import { useMinuteToSecond } from "./hooks/useSecondToMinute";

function App() {
  const [players, setPlayers] = useState([]);
  const [color, setColor] = useState();
  const [time, setTime] = useState();
  const [renderPlayer, setRenderPlayer] = useState(false);
  const [minutesGame, setMinutesGame] = useState(0);
  const [secondsGame, setSecondsGame] = useState(0);
  const [deleteColor, setDeleteColor] = useState(false);
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
  const handleChangeTimeSecond = (e) => {
    const sec = e.target.value;
    console.log(sec);
    setSecondsGame(sec);
  };
  const handleChangeTimeMinute = (e) => {
    const min = e.target.value;
    console.log(min);
    setMinutesGame(min);
  };

  useEffect(() => {
    setTime(useMinuteToSecond(minutesGame, secondsGame));
  }, [minutesGame, secondsGame]);

  const handleAddPlayer = (e) => {
    e.preventDefault();
    ++id.current;
    const minutes =
      minute.current.value === "" ? 0 : parseInt(minute.current.value);
    const seconds =
      second.current.value === "" ? 0 : parseInt(second.current.value);
    const timeBank = useMinuteToSecond(minutes, seconds);
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
    setDeleteColor(!deleteColor);
  };

  return renderPlayer ? (
    <Timer initialTime={time} players={players} />
  ) : (
    <div className="App">
      <h1>Temporizador</h1>
      <form className="containerTimeGame">
        <h2>Tiempo por turno: </h2>
        <div className="containerMinutesGame">
          <label htmlFor="minutesGame" className="minutesGame">
            <input
              onChange={handleChangeTimeMinute}
              type="number"
              id="minutesGame"
              name="minutesGame"
              min="0"
              max="59"
              className="inputTimeGame"
            ></input>
          </label>
          <span>:</span>
          <label htmlFor="secondsGame" className="minutesGame">
            <input
              onChange={handleChangeTimeSecond}
              type="number"
              id="secondsGame"
              name="secondsGame"
              min="0"
              max="59"
              className="inputTimeGame"
            ></input>
          </label>
        </div>
      </form>
      <form  onSubmit={handleAddPlayer}>
        <h2>Jugador: </h2> 
        <SelectColor color={handleChangeColor} deleteColor={deleteColor} />
        <label>
          Nombre
          <input type="text" id="name" ref={nameInput} />
        </label>
        <div className="containerMinutesGame">
          Tiempo de banco del jugador
          <label htmlFor="minutes">
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
            <input
              ref={second}
              type="number"
              id="seconds"
              name="seconds"
              min="0"
              max="59"
            ></input>
          </label>
        </div>
        <p>
          Jugadores: <span>{players.length}</span>
        </p>
        <button>Agregar</button>
      </form>
      <button onClick={handleClickStartGame}>Empezar juego</button>
    </div>
  );
}
export default App;
