import { useContext, useEffect, useState } from "react";
import "./App.css";
import VehicleComponent from "./component/VehicleComponent";
import {
  GameServerContext,
  GameServerProvider,
} from "./component/GameServercontext";
import PlayerControls from "./component/PlayerControls";
import GameClientContext, {
  GameClientProvider,
} from "./component/GameClientContext";

function App() {
  const gameContext = useContext(GameServerContext);

  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const [messages, setMessages] = useState<string[]>([]);

  const [isServer, setisServer] = useState<boolean>(false);

  // useEffect(() => {
  //   const newSocket = new WebSocket("ws://localhost:5207/ws");
  //   setSocket(newSocket);
  //   gameContext?.addVehicle();

  //   newSocket.addEventListener("open", () => {
  //     console.log("connected to server");

  //     // TODO send new vehicle??
  //     socket?.send("");
  //     // client sends a vehicle (id, "moveforward") for example
  //     newSocket.send("Hello Server!");
  //   });

  //   newSocket.addEventListener("message", (event) => {
  //     console.log("received event", event.data);

  //     // client recieves a list of vehicles
  //     setMessages((oldMessages) => [...oldMessages, event.data]);
      
  //   });
  // }, []);

  // Server
  // useEffect(() => {
  //   const newSocket = new WebSocket("ws://localhost:5207/ws");
  //   setSocket(newSocket);
  //   gameContext?.addVehicle()

  //   newSocket.addEventListener("open", () => {
  //     console.log("connected to server");

  //     // TODO send new vehicle??

  //     // client sends a vehicle (id, "moveforward") for example
  //     newSocket.send("Hello Server!");
  //   });

  //   newSocket.addEventListener("message", (event) => {
  //     console.log("received event", event.data);

  //     // client recieves a list of vehicles
  //     setMessages((oldMessages) => [...oldMessages, event.data]);
  //   });
  // }, []);

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
            <PlayerControls />
            <VehicleComponent vehicle={gameContext?.vehicle} />
          </GameServerProvider>
        </div>
      ) : (
        <div>
          <h1>Client</h1>
          <GameClientProvider>
            <PlayerControls />
            <VehicleComponent vehicle={gameContext?.vehicle} />
          </GameClientProvider>
        </div>
      )}
      {/* <h1>WebSocket chat home page</h1>
      <button onClick={() => {
        if (!socket) {
          console.error("socket not connected, cannot send message");
          return;
        }
        socket?.send("Hello Server!")
      }} disabled={!socket}>send message</button>
      <div>
      {messages.map((message, i) => (
        <div key={i.toString()}>{message}</div>
    ))}
      </div> */}
    </>
  );
}

export default App;
