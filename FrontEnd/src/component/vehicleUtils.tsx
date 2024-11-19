import { FC, useState } from "react";
import Vehicle from "./Vehicle";
import { PlayerInterface } from "../types/PlayerInterface";
import { Direction } from "../types/Direction";

interface vehicleUtilsProps {
  oldVehicle: PlayerInterface;
}

export const vehicleUtils: FC<vehicleUtilsProps> = ({ oldVehicle }) => {
  console.log(oldVehicle);
  const DEGREES: number = 3;

//   const newVehicle:PlayerInterface = {
//       id: oldVehicle.id,
//       xPosition: oldVehicle.xPosition,
//       yPosition: oldVehicle.yPosition,
//       angle: oldVehicle.angle,
//       direction: oldVehicle.direction,
//       velocity: oldVehicle.velocity
//   }

  const [newV, setnewV] = useState(oldVehicle)

  const moveVehicle = (oldVehicle: PlayerInterface) => {
    if (oldVehicle.direction == Direction.Left) {
        setnewV((oldVehicle) => ({... oldVehicle, direction: oldVehicle.angle - DEGREES}))
    }

    if (oldVehicle.direction == Direction.Right) {
        setnewV((oldVehicle) => ({... oldVehicle, direction: oldVehicle.angle + DEGREES}))
    }
    
  }

  return <Vehicle />
};
