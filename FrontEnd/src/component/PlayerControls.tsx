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
      gameContext?.updateVehicle(1, "moveForward");
    }
    if (event.key == "s") {
      console.log("move backward");
      gameContext?.updateVehicle(1, "moveBackward");
    }
    if (event.key == "a") {
      console.log("turn left");
      gameContext?.updateVehicle(1, "turnLeft");
    }
    if (event.key == "d") {
      console.log("turn right");
      gameContext?.updateVehicle(1, "turnRight");
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key == "w") {
      console.log("stop moving forward ");
      gameContext?.updateVehicle(1, "stopForwards");
    }
    if (event.key == "s") {
      console.log("stop move backward");
      gameContext?.updateVehicle(1, "stopBackwards");
    }
    if (event.key == "a") {
      console.log("stope turn left");
      gameContext?.updateVehicle(1, "stopLeft");
    }
    if (event.key == "d") {
      console.log("stop turn right");
      gameContext?.updateVehicle(1, "stopRight");
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
