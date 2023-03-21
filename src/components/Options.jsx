import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import SelectColor from './SelectColor'

const Options = () => {
    const [players, setPlayers] = useState([]);
    const [color, setColor] = useState();
    const [time, setTime] = useState();
    const navigate = useNavigate();
    const [renderPlayer, setRenderPlayer] = useState(false)
  
    const timer = useRef();
    const timerBank = useRef();
    const nameInput = useRef();
    let id = useRef(-1);
  
    const handleChangeColor = (color) => {
      setColor(color);
    };
    const handleClickStartGame = () => {
      navigate("/startgame")
    };
  
  
    const handleSubmitPlayer = (e) => {
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
  

  return (
    <div className="App">
      <ul className="timerListPlayer"></ul>
      <form onSubmit={handleSubmitTime}>
        <label>
          Time of game
          <input type="number" ref={timer} />
        </label>
        <button>Enter</button>
      </form>
      {time ? <p>Time: {time}</p> : <p>Elija tiempo de juego</p>}
      <form onSubmit={handleSubmitPlayer}>
        <SelectColor color={handleChangeColor} />
        <label>
          Player
          <input type="text" id="name" ref={nameInput} />
        </label>
        <label>
          Time of bank
          <input type="number" ref={timerBank} />
        </label>
        <p>Players: {players.length}</p>
        <button>Add</button>
      </form>
      <button onClick={handleClickStartGame}>Start game</button>
    </div>
  );
};

export default Options;
