import { createContext, ReactNode, useEffect, useState } from "react";
import { Vehicle } from "../types/PlayerInterface";
import { Direction } from "../types/Direction";
import { moveVehicle } from "./vehicleUtils";

interface GameServerContextType {
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
export const GameServerContext = createContext<GameServerContextType | undefined>(undefined);

export const GameServerProvider: React.FC<{ children: ReactNode }> = ({children}) => {

  const [ticking] = useState(true),
  [count, setCount] = useState(0);

  const [vehicle, setVehicle] = useState<Vehicle>({
    id: Date.now(),
    xPosition: 0,
    yPosition: 0,
    angle: 0,
    direction: Direction.Straight,
    velocity: 0,
  });

  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([])

  const addVehicle = () => {
    console.log("Adding Vehcile", allVehicles.length)
    const randoVehicle: Vehicle = {
      id: Date.now(),
      xPosition: 0,
      yPosition: 0,
      angle: 0,
      direction: Direction.Straight,
      velocity: 0
    }
    setAllVehicles(oldList => [...oldList, randoVehicle])
  }

  const removeVehicle = (vehicle: Vehicle ) => {
    console.log("Removeing  Vehcile", allVehicles.length)

    setAllVehicles(oldList => oldList.filter(v => v.id != vehicle.id))
  }

  // console.log("VEHICLES IN CONTEXT", allVehicles)


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
    console.log("bahhhh", vehicle.id, id)
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

  //listen for key press
  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 10);
    setVehicle((x) => moveVehicle(x));

    return () => clearTimeout(timer);
  }, [count, ticking]);

  return (
    <GameServerContext.Provider value={{ vehicle, updateVehicle, addVehicle, removeVehicle }}>
      {children}
    </GameServerContext.Provider>
  );
};
