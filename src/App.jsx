import "./App.css";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import SelectColor from "./components/SelectColor";
import Timer from "./components/Timer";
import { useMinuteToSecond } from "./hooks/useSecondToMinute";
import { Players } from "./components/Players";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [players, setPlayers] = useState([]);
  const [color, setColor] = useState(null);
  const [time, setTime] = useState();
  const [renderPlayer, setRenderPlayer] = useState(false);
  const [name, setName] = useState()
  const [minutesGame, setMinutesGame] = useState(0);
  const [secondsGame, setSecondsGame] = useState(0);
  const [isDeleteColor, setIsDeleteColor] = useState(false);
  const [isFirstInput, setIsFirstInput] = useState(true);
  const [errorSelectColor, setErrorSelectColor] = useState();
  const [errorNotPlayers, setErrorNotPlayers] = useState(false);
 

  const minute = useRef();
  const second = useRef();

  let id = useRef(-1);

  useEffect(() => {
    if (isFirstInput) {
      setIsFirstInput(color === null) 
      
      return;
    }

    if(players.length === 6){
      setErrorSelectColor('')
      return
    }
    if (color === null  ) {
      setErrorSelectColor("Elija un color");
    } else {
      setErrorSelectColor("");
    }
    setTimeout(() => {
      setErrorSelectColor('')
    }, 3000);

  }, [color, isFirstInput, players]);

  const handleChangeColor = (color) => {
    setColor(color);
  };
  const handleClickStartGame = () => {
    if(players.length >= 2){
      setRenderPlayer(true);
    }
    setErrorNotPlayers(true)
  };
  const handleChangeTimeSecond = (e) => {
    const sec = e.target.value;
    setSecondsGame(sec);
  };
  const handleChangeTimeMinute = (e) => {
    const min = e.target.value;
    setMinutesGame(min);
  };
  const handleChangeName = (e) =>{
    const name = e.target.value;
    setName(name)
  }

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

    if(!isFirstInput && color !== null && !errorSelectColor){   
      setPlayers([
        ...players,
        {
          id: id.current,
          name,
          color: color,
          timerBank: timeBank,
          isActive: false,
        },
      ]);
      setIsDeleteColor(!isDeleteColor);
      setColor(null);
    }else{
      setIsFirstInput(false)

    }
    setName('')
  };

  return renderPlayer ? (
    <Timer initialTime={time} players={players} />
  ) : (
    <div className="App">
      <div>
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
            <div
              style={
                !errorSelectColor
                  ? { display: "flex", marginBottom: "16px" }
                  : { display: "flex" }
              }
            >
              <SelectColor
                color={handleChangeColor}
                isDeleteColor={isDeleteColor}
              />

              <input
                placeholder="Nombre"
                type="text"
                id="name"
                value={name}
                onChange={handleChangeName}
              />
            </div>
            {errorSelectColor ? (
              <p
                style={{
                  color: "red",
                  fontSize: "0.8rem",
                  textAlign: "initial",
                }}
              >
                {errorSelectColor}
              </p>
            ) : null}
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
          <Players players={players} errorNotPlayers={errorNotPlayers} />
        </div>
      </div>
      <button
        style={{ width: "100%", height: "4rem", marginBottom: "50px" }}
        onClick={handleClickStartGame}
      >
        Empezar juego
      </button>
    </div>
  );
}
export default App;
