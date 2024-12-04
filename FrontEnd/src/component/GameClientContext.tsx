import { createContext, ReactNode, useState } from "react";
import { Vehicle } from "../types/PlayerInterface";
import { Direction } from "../types/Direction";

interface Params {
  myVehicles?: Vehicle[];
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
    const message = {
      isMovementRequest: true,
      id: id,
      movementFlag: vehicleAction
    };
  
    socket?.send(JSON.stringify(message));
  };

  return (
    <GameClientContext.Provider
      value={{ myVehicles, updateVehicle, addVehicle, removeVehicle }}
    >
      {children}
    </GameClientContext.Provider>
  );
};

export default GameClientContext;
