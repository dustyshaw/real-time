import { useState } from "react";
import "./App.css";
import VehicleComponent from "./component/VehicleComponent";
import {
  GameServerProvider,
} from "./component/GameServercontext";
import PlayerControls from "./component/PlayerControls";
import { GameClientProvider } from "./component/GameClientContext";
import VehicleClientComponent from "./component/VehicleClientComponent";

function App() {
  const [isServer, setisServer] = useState<boolean>(false);

  return (
    <>
      <div>
        <button onClick={() => setisServer(true)}>Server</button>
        <button onClick={() => setisServer(false)}>Client</button>
      </div>
      {isServer ? (
        <div>
          <h1>Server!</h1>
          <GameServerProvider>
            <PlayerControls usingServer={true} />
            <VehicleClientComponent />
          </GameServerProvider>
        </div>
      ) : (
        <div>
          <h1>Client</h1>
          <GameClientProvider>
            <PlayerControls usingServer={false} />
            <VehicleComponent />
          </GameClientProvider>
        </div>
      )}
    </>
  );
}

export default App;
