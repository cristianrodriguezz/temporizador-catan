import "./App.css";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import SelectColor from "./components/SelectColor";
import Timer from "./components/Timer";
import { useMinuteToSecond } from "./hooks/useSecondToMinute";
import { Players } from "./components/Players";

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
    setSecondsGame(sec);
  };
  const handleChangeTimeMinute = (e) => {
    const min = e.target.value;
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
              placeholder="00"
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
              placeholder="00"
            ></input>
          </label>
        </div>
      </form>
      <div className="containerPlayers">
        <form className="containerAddPlayer" onSubmit={handleAddPlayer}>
          <div style={{display:'flex'}}>
            <SelectColor color={handleChangeColor} deleteColor={deleteColor} />
            <input placeholder="Nombre" type="text" id="name" ref={nameInput} />
          </div>

          <div className="containerMinutesGame">
            <h2>Banco de tiempo:</h2>
            <label htmlFor="minutes">
              <input
              placeholder="00"
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
              placeholder="00"
                ref={second}
                type="number"
                id="seconds"
                name="seconds"
                min="0"
                max="59"
              ></input>
            </label>
          </div>
          <button style={{ width: "100%", height: "4rem" }}>+</button>
        </form>
        <Players players={players} />
        <button
          style={{ width: "100%", height: "4rem", marginBottom: '10px' }}
          onClick={handleClickStartGame}
        >
          Empezar juego
        </button>
      </div>
    </div>
  );
}
export default App;
