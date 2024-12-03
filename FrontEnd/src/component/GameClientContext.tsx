import { createContext, ReactNode, useEffect, useState } from "react";
import { Vehicle } from "../types/PlayerInterface";
import PlayerControls from "./PlayerControls";
import { Direction } from "../types/Direction";

interface Params {
  vehicle: Vehicle;
  updateVehicle: (
    id: number,
    vehicleAction:
      | "moveForward" //'w' pressed
      | "moveBackward" //'s' pressed
      | "turnLeft" // a pressed
      | "turnRight" //'d' presed
      | "stopForwards" //w
      | "stopBackwards" //s
      | "stopLeft" //a key
      | "stopRight" //d
  ) => void;
  addVehicle: () => void;
  removeVehicle: (vehicle: Vehicle) => void;
}

export const GameClientContext = createContext<Params | undefined>(undefined);

export const GameClientProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [myVehicles, setMyVehicles] = useState<Vehicle[]>([]);
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  // Sends a message (vehicle id, "moveforward") for example
  // and then the server takes care of updating.

  // This recieves a list of vehicles fromt he server context
  // then updates all the client vehicles according to what it recieved.

  const [vehicle, setVehicle] = useState<Vehicle>({
    id: Date.now(),
    xPosition: 0,
    yPosition: 0,
    angle: 0,
    direction: Direction.Straight,
    velocity: 0,
  });

  const addVehicle = () => {
    const randoVehicle: Vehicle = {
      id: Date.now(),
      xPosition: 0,
      yPosition: 0,
      angle: 0,
      direction: Direction.Straight,
      velocity: 0,
    };
    setMyVehicles((oldList) => [...oldList, randoVehicle]);

    //Tell server context to add a vehicle
    socket?.send(myVehicles.toString())
  };

  const removeVehicle = (vehicle: Vehicle) => {
    //let the server remove it.
  };

  const updateVehicle = (
    id: number,
    vehicleAction:
      | "moveForward" //'w' pressed
      | "moveBackward" //'s' pressed
      | "turnLeft" // a pressed
      | "turnRight" //'d' presed
      | "stopForwards" //w
      | "stopBackwards" //s
      | "stopLeft" //a key
      | "stopRight" //d
  ) => {
    // adjust vehicle movement flags according to vehicleAction
    if (id == vehicle.id) {
      setVehicle((oldVehicle) => {
        switch (vehicleAction) {
          case "moveForward":
            return {
              ...oldVehicle,
              direction: Direction.Straight,
              velocity: (oldVehicle.velocity = 1),
            };
          case "moveBackward":
            return {
              ...oldVehicle,
              direction: Direction.Straight,
              velocity: (oldVehicle.velocity = -1),
            };
          case "turnLeft":
            return {
              ...oldVehicle,
              direction: Direction.Left,
              velocity: (oldVehicle.velocity = 0),
            };
          case "turnRight":
            return {
              ...oldVehicle,
              direction: Direction.Right,
              velocity: (oldVehicle.velocity = 0),
            };
          case "stopForwards":
            return { ...oldVehicle, velocity: 0 };
          case "stopBackwards":
            return { ...oldVehicle, velocity: 0 };
          case "stopLeft":
            return {
              ...oldVehicle,
              velocity: 0,
              direction: Direction.Straight,
            };
          case "stopRight":
            return {
              ...oldVehicle,
              velocity: 0,
              direction: Direction.Straight,
            };
          default:
            return oldVehicle;
        }
      });
    }
    // do not move the vehicle, just set movement flags for next movement cycle
  };

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5207/ws");
    setSocket(newSocket);
    addVehicle();

    newSocket.addEventListener("open", () => {
      // console.log("connected to server");

      // TODO send new vehicle??
      // client sends a vehicle (id, "moveforward") for example
      newSocket.send("Hello Server this is the client speaking!");
      const message = {
        id: vehicle.id,
        direction: vehicle.direction
      };
    
      // Send the message as a string
      newSocket.send(JSON.stringify(message));
    });

    newSocket.addEventListener("message", (event) => {
      console.log("received event on CLIENT: ", event.data);

      // client recieves a list of vehicles
      setMyVehicles((oldVehicles) => [...oldVehicles, event.data])
    });
  }, []);

  // console.log("CLIENT VEHICLES: ", myVehicles)

  return (
    <GameClientContext.Provider
      value={{ vehicle, updateVehicle, addVehicle, removeVehicle }}
    >
      {children}
    </GameClientContext.Provider>
  );
};

export default GameClientContext;
