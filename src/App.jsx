import "./App.css";
import { Route, Routes } from "react-router";
import Options from "./components/Options";
import Timer from "./components/Timer";

function App() {

  return (
    <Routes>
      <Route path="/" exact element={<Options/>} />
      <Route path="/startgame" exact element={<Timer/>} />
    </Routes>
  );
}

export default App;
