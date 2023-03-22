import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import SelectColor from "./components/SelectColor";
import Timer from "./components/Timer";
import { useForm } from "react-hook-form";

function App() {
  const [players, setPlayers] = useState([]);
  const [color, setColor] = useState();
  const [time, setTime] = useState();
  const [renderPlayer, setRenderPlayer] = useState(false);
  const timer = useRef();
  const timerBank = useRef();
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

    setPlayers([
      ...players,
      {
        id: id.current,
        name: nameInput.current.value,
        color: color,
        timerBank: parseInt(timerBank.current.value),
        isActive: false,
      },
    ]);
  };

  const handleSubmitTime = (e) => {
    e.preventDefault();
    const time = timer.current.value;

    setTime(time);
  };

  return renderPlayer ? (
    <Timer initialTime={time} players={players} />
  ) : (
    <div className="App">
      <h1>Temporizador para juegos de mesa</h1>
      <form onSubmit={handleSubmitTime}>
        <label>
          Tiempo de juego
          <input type="number" ref={timer} />
        </label>
        <button>Enter</button>
      </form>
      {time ? <p>Tiempo: {time}</p> : null}
      <form onSubmit={handleAddPlayer}>
        <SelectColor color={handleChangeColor} />
        <label>
          Jugador
          <input type="text" id="name" ref={nameInput} />
        </label>
        <label>
          Tiempo del banco
          <input type="number" step={15} ref={timerBank} />
        </label>
        <p>Jugadores: {players.length}</p>
        <button>Agregar</button>
      </form>
      <button onClick={handleClickStartGame}>Empezar juego</button>
    </div>
  );
}
export default App;
