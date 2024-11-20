import { Vehicle } from "../types/PlayerInterface";
import { Direction } from "../types/Direction";

export const moveVehicle = (oldVehicle: Vehicle): Vehicle  => {
  console.log(oldVehicle);
  const DEGREES: number = 45;
  const VELOCITY: number = oldVehicle.velocity;

    const newVehicle:Vehicle = {
        id: oldVehicle.id,
        xPosition: oldVehicle.xPosition,
        yPosition: oldVehicle.yPosition,
        angle: oldVehicle.angle,
        direction: oldVehicle.direction,
        velocity: oldVehicle.velocity
    }

    if (oldVehicle.direction == Direction.Left) {
      newVehicle.angle = newVehicle.angle - DEGREES
    }

    if (oldVehicle.direction == Direction.Right) {
      newVehicle.angle = newVehicle.angle + DEGREES
    }

    const angleInRadians = newVehicle.angle * Math.PI / 180;

    //if (oldVehicle.velocity === 1) {
      newVehicle.xPosition = Math.round(oldVehicle.xPosition + VELOCITY * Math.cos(angleInRadians));
      newVehicle.yPosition = Math.round(oldVehicle.yPosition + VELOCITY * Math.sin(angleInRadians));
    //}
  

    return newVehicle;
};
