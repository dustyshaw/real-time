import { createContext, ReactNode, useEffect, useState } from "react";
import { Vehicle } from "../types/PlayerInterface";
import { Direction } from "../types/Direction";
import { moveVehicle } from "./vehicleUtils";

interface GameServerContextType {
  allVehicles: Vehicle[];
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

export const GameServerContext = createContext<
  GameServerContextType | undefined
>(undefined);

export const GameServerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [ticking] = useState(true),
    [count, setCount] = useState(0);
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  const [vehicle, setVehicle] = useState<Vehicle>({
    id: Date.now(),
    xPosition: 0,
    yPosition: 0,
    angle: 0,
    direction: Direction.Straight,
    velocity: 0,
  });

  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);

  const addVehicle = () => {
    console.log("Adding Vehcile", allVehicles.length);
    const randoVehicle: Vehicle = {
      id: Date.now(),
      xPosition: 0,
      yPosition: 0,
      angle: 0,
      direction: Direction.Straight,
      velocity: 0,
    };
    setAllVehicles((oldList) => [...oldList, randoVehicle]);
  };

  const removeVehicle = (vehicle: Vehicle) => {
    console.log("Removeing  Vehcile", allVehicles?.length);

    setAllVehicles((oldList) => oldList?.filter((v) => v.id != vehicle.id));
  };

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5207/ws");
    setSocket(newSocket);
    addVehicle();

    newSocket.addEventListener("open", () => {
      newSocket.send(String(allVehicles));
    });

    newSocket.addEventListener("message", (event) => {
      console.log("received event on SERVER: ", event.data);
      const parsedData = JSON.parse(event.data);
      // Recieves either a list of vehicles or a request to update vehicle. 

      if (parsedData.isMovementRequest) {
        updateVehicle(parsedData.id, parsedData.movementFlag)
      }
    });
  }, []);

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (socket && socket.readyState === WebSocket.OPEN) {
  //       console.log("Broadcasting game state");
  //       socket.send(JSON.stringify({ type: "gameState", vehicles: allVehicles }));
  //     }
  //   }, 100); // Send every 10th of a second (10 times per second)

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [allVehicles, socket]);

  //listen for key press
  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 10);
    setVehicle((x) => moveVehicle(x));

    return () => clearTimeout(timer);
  }, [count, ticking]);

  return (
    <GameServerContext.Provider
      value={{ allVehicles, updateVehicle, addVehicle, removeVehicle }}
    >
      {children}
    </GameServerContext.Provider>
  );
};
