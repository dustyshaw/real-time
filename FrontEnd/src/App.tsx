import { useContext, useEffect, useState } from "react";
import "./App.css";
import VehicleComponent from "./component/VehicleComponent";
import { GameServerContext } from "./component/GameServercontext";
import PlayerControls from "./component/PlayerControls";

function App() {
  const gameContext = useContext(GameServerContext);

  // const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  // const [messages, setMessages] = useState<string[]>([]);
  // useEffect(() => {
  //   const newSocket = new WebSocket("ws://localhost:5207/ws")
  //   setSocket(newSocket);
  //   newSocket.addEventListener("open", () => {
  //     console.log("connected to server");
  //     newSocket.send("Hello Server!");
  //   });
  //   newSocket.addEventListener("message", (event) => {
  //     console.log("received event", event.data);
  //     setMessages(oldMessages => [...oldMessages, event.data])
  //   })
  // }, [])

  return (
    <>
      <div>
        <PlayerControls />
        <VehicleComponent vehicle={gameContext?.vehicle} />
      </div>
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
