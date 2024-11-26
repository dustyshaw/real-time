import { useContext, useEffect } from "react";
import { GameServerContext } from "./GameServercontext";

const PlayerControls = () => {
  // Create a PlayerControls component that displays nothing,
  // but binds to the 'wasd' keydown and keyup events to appropriately
  //  set the vehicle movement flags. Bind to the events in a useEffect,
  // be sure to clean up the event bindings properly.

  const gameContext = useContext(GameServerContext);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key == "w") {
      console.log("move forward ");
      // TODO change to id
      gameContext?.updateVehicle(gameContext.vehicle.id, "moveForward");
    }
    if (event.key == "s") {
      console.log("move backward");
      gameContext?.updateVehicle(gameContext.vehicle.id, "moveBackward");
    }
    if (event.key == "a") {
      console.log("turn left");
      gameContext?.updateVehicle(gameContext.vehicle.id, "turnLeft");
    }
    if (event.key == "d") {
      console.log("turn right");
      gameContext?.updateVehicle(gameContext.vehicle.id, "turnRight");
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key == "w") {
      console.log("stop moving forward ");
      gameContext?.updateVehicle(gameContext.vehicle.id, "stopForwards");
    }
    if (event.key == "s") {
      console.log("stop move backward");
      gameContext?.updateVehicle(gameContext.vehicle.id, "stopBackwards");
    }
    if (event.key == "a") {
      console.log("stope turn left");
      gameContext?.updateVehicle(gameContext.vehicle.id, "stopLeft");
    }
    if (event.key == "d") {
      console.log("stop turn right");
      gameContext?.updateVehicle(gameContext.vehicle.id, "stopRight");
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyPress);
    document.body.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.removeEventListener("keydown", handleKeyPress);
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return ( <></> )
};

export default PlayerControls;
