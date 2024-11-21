import { Vehicle } from "../types/PlayerInterface";
import { Direction } from "../types/Direction";

export const moveVehicle = (oldVehicle: Vehicle): Vehicle => {
  const DEGREES: number = 2;
  const VELOCITY: number = oldVehicle.velocity;

  const newVehicle: Vehicle = {
    ...oldVehicle
  };
  // console.log(oldVehicle.direction)

  if (oldVehicle.direction == Direction.Left) {
    console.log("TURNING left ")
    newVehicle.angle = oldVehicle.angle - DEGREES;
    // console.log(newVehicle)
  }
  
  if (oldVehicle.direction == Direction.Right) {
    newVehicle.angle = oldVehicle.angle + DEGREES;
  }
  console.log("angle is ", newVehicle.angle)

  const angleInRadians = (newVehicle.angle * Math.PI) / 180;
  // console.log(angleInRadians);

  //if (oldVehicle.velocity === 1) {
  newVehicle.xPosition = Math.round(
    (oldVehicle.xPosition =
      oldVehicle.xPosition + VELOCITY * Math.cos(angleInRadians))
  );
  newVehicle.yPosition = Math.round(
    (oldVehicle.yPosition += VELOCITY * Math.sin(angleInRadians))
  );
  //}

  // console.log("Vehicle");
  console.log(newVehicle);

  return newVehicle;
};
