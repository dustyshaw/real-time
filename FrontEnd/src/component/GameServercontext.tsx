import { createContext, ReactNode, useState, useSyncExternalStore } from "react";
import { Vehicle } from "../types/PlayerInterface";
import { Direction } from "../types/Direction";

interface GameServerContextType {
    vehicle: Vehicle;
    updateVehicle: (id: number, vehicleAction:
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
export const GameServerContext = createContext<GameServerContextType | undefined>(undefined)

export const GameServerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [vehicle, setVehicle] = useState<Vehicle>({
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 90,
        direction: Direction.Straight,
        velocity: 2
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
        setVehicle((oldVehicle) => {

            switch (vehicleAction) {
                case "moveForward":
                    return { ...oldVehicle, yPosition: oldVehicle.yPosition + 1 }; // move forward on the Y-axis
                case "moveBackward":
                    return { ...oldVehicle, yPosition: oldVehicle.yPosition - 1 }; // move backward on the Y-axis
                case "turnLeft":
                    return { ...oldVehicle, direction: Direction.Left }; // update direction to left
                case "turnRight":
                    return { ...oldVehicle, direction: Direction.Right }; // update direction to right
                case "stopForwards":
                    return { ...oldVehicle, ySpeed: 0 }; // stop forward movement (Y-axis speed)
                case "stopBackwards":
                    return { ...oldVehicle, ySpeed: 0 }; // stop backward movement
                case "stopLeft":
                    return { ...oldVehicle, xSpeed: 0 }; // stop leftward movement
                case "stopRight":
                    return { ...oldVehicle, xSpeed: 0 }; // stop rightward movement
                default:
                    return oldVehicle;
            }

        });
        //adjust behicle movement clags according to vehicle action
        //do not move vehicle
    }

    //listen for key press
    // const updateVehicle() => {
    //     const [vehicle,]
    // }
    //update the vehicle by calling setVehicle


    return (
        <GameServerContext.Provider value={{ vehicle, updateVehicle }}>
            {children}
        </GameServerContext.Provider>
    );
}