import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
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
}
export const GameServerContext = createContext<
  GameServerContextType | undefined
>(undefined);

export const GameServerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const [ticking, setTicking] = useState(true),
  [count, setCount] = useState(0);

  const [vehicle, setVehicle] = useState<Vehicle>({
    id: 1,
    xPosition: 0,
    yPosition: 0,
    angle: 0,
    direction: Direction.Straight,
    velocity: 2,
  });

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
    setVehicle((oldVehicle) => {
      switch (vehicleAction) {
        case "moveForward":
          return { ...oldVehicle, direction: Direction.Straight, velocity: oldVehicle.velocity = 1 }; // move forward on the Y-axis
        case "moveBackward":
          return { ...oldVehicle, direction: Direction.Straight, velocity: oldVehicle.velocity = -1 }; // move backward on the Y-axis
        case "turnLeft":
          return { ...oldVehicle, direction: Direction.Left, velocity: oldVehicle.velocity = -1 }; // update direction to left
        case "turnRight":
          return { ...oldVehicle, direction: Direction.Right, velocity: oldVehicle.velocity = 1 }; // update direction to right
        case "stopForwards":
          return { ...oldVehicle, velocity: 0 }; // stop forward movement (Y-axis speed)
        case "stopBackwards":
          return { ...oldVehicle, velocity: 0 }; // stop backward movement
        case "stopLeft":
          return { ...oldVehicle, velocity: 0, direction: Direction.Straight }; // stop leftward movement
        case "stopRight":
          return { ...oldVehicle, velocity: 0 }; // stop rightward movement
        default:
          return oldVehicle;
      }
    });
 
    // do not move the vehicle, just set movement flags for next movement cycle
  };

  //listen for key press

  //update the vehicle by calling setVehicle
  // useEffect(() => {
  //   moveVehicle(vehicle)
  //   console.log(vehicle)
  // }, [vehicle])

  
  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 10)
    // console.log("hello?")
    setVehicle(x => moveVehicle(x))
    // console.log(vehicle)

    return () => clearTimeout(timer)
  }, [count, ticking])
  

  return (
    <GameServerContext.Provider value={{ vehicle, updateVehicle }}>
      {children}
    </GameServerContext.Provider>
  );
};
