import { Vehicle } from "../types/PlayerInterface";
import { Direction } from "../types/Direction";

export const moveVehicle = (oldVehicle: Vehicle): Vehicle => {
  const DEGREES: number = 2;
  const VELOCITY: number = oldVehicle.velocity;

  const newVehicle: Vehicle = {
    ...oldVehicle
  };

  if (oldVehicle.direction == Direction.Left) {
    newVehicle.angle = oldVehicle.angle - DEGREES;
  }
  
  if (oldVehicle.direction == Direction.Right) {
    newVehicle.angle = oldVehicle.angle + DEGREES;
  }

  const angleInRadians = (newVehicle.angle * Math.PI) / 180;

  newVehicle.xPosition = Math.round(
    (oldVehicle.xPosition =
      oldVehicle.xPosition + VELOCITY * Math.cos(angleInRadians))
  );
  newVehicle.yPosition = Math.round(
    (oldVehicle.yPosition += VELOCITY * Math.sin(angleInRadians))
  );

  return newVehicle;
};
