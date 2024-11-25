import { useContext } from "react";
import "./App.css";
import VehicleComponent from "./component/VehicleComponent";
import { GameServerContext } from "./component/GameServercontext";
import PlayerControls from "./component/PlayerControls";

function App() {
  const gameContext = useContext(GameServerContext);

  return (
    <>
      <div>
        <PlayerControls />
        <VehicleComponent vehicle={gameContext?.vehicle} />
      </div>
    </>
  );
}

export default App;
