import { useContext, useEffect } from "react";
import "./App.css";
import VehicleComponent from "./component/VehicleComponent";
import { GameServerContext } from "./component/GameServercontext";
import PlayerControls from "./component/PlayerControls";

function App() {
  const gameContext = useContext(GameServerContext);

  const playerControls = PlayerControls;

  // useEffect(() => {
  //   document.body.addEventListener("keydown", playerControls.handleKeyPress);
  //   document.body.addEventListener("keyup", handleKeyUp);

  //   return () => {
  //     document.body.removeEventListener("keydown", handleKeyPress);
  //     document.body.removeEventListener("keyup", handleKeyUp);
  //   };
  // }, []);

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
