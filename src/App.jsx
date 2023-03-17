import { useRef, useState } from "react";
import "./App.css";
import { Players } from "./components/Players";
import { TimersPlayers, TimerGame } from "./components/TimersPlayers";
import SelectColor from "./components/SelectColor";
import Timer from "./components/Timer";

function App() {
  const [players, setPlayers] = useState([]);
  const [color, setColor] = useState();
  const [time, setTime] = useState();
  const [next, setNext] = useState();
  const timer = useRef();
  const timerBank = useRef();
  const nameInput = useRef();
  let id = useRef(-1);

  const handleChangeColor = (color) => {
    setColor(color);
  };
  const handleClick = (next) => {
    setNext(next);
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
        timerBank: timerBank.current.value,
        isActive: false
      },
    ]);
  };
  const handleSubmitTime = (e) => {
    e.preventDefault();
    const time = timer.current.value;
    setTime(time);
  };

  return (
    <>
      <div className="App">
        <ul className="timerListPlayer"></ul>
        <form onSubmit={handleSubmitTime}>
          <label>
            Time of game
            <input type="number" ref={timer} />
          </label>
          <button>Enter</button>
        </form>
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
          <button>Add</button>
        </form>
      </div>
      <Players players={players} />
      {//<TimersPlayers initialTime={time} players={players} />
      }
      {
        time ? 
        <Timer initialTime={time} players={players} />
        :
        null
      }
    </>
  );
}

export default App;
