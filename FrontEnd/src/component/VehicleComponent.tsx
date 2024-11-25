import { FC } from "react";
import VehicleIcon from "./VehicleIcon";
import { Vehicle } from "../types/PlayerInterface";

interface VehicleComponentProps {
  vehicle: Vehicle | undefined;
}

const VehicleComponent: FC<VehicleComponentProps> = ({vehicle}) => {
  return (
    <div
      style={{
        position: "fixed",
        rotate: `${vehicle?.angle}deg`,
        fill: "#999999",
        width: `80px`,
        height: `80px`,
        top: `${vehicle?.xPosition}px`,
        left: `${vehicle?.yPosition}px`,
      }}
    >
      <VehicleIcon />
    </div>
  );
};

export default VehicleComponent;
