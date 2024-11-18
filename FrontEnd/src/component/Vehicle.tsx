import React, { useState } from "react";
import VehicleIcon from "./VehicleIcon";
import { PlayerInterface } from "../types/PlayerVehicle";

const Vehicle = () => {
  const [car, setCar] = useState<PlayerInterface>();
  return (
    <div
      style={{
        position: "fixed",
        rotate: `${car?.angle}deg`,
        fill: "#999999",
        width: `80px`,
        height: `80px`,
        top: `${car?.xPosition}px`,
        left: `${car?.yPosition}px`,
      }}
    >
      <VehicleIcon />
    </div>
  );
};

export default Vehicle;
