import { useContext } from "react";
import VehicleIcon from "./VehicleIcon";
import { GameServerContext } from "./GameServercontext";

const VehicleComponent = () => {
  const context = useContext(GameServerContext);

  return (
    <>
      {context?.allVehicles?.map((vehicle, key) => (
        <div
          key={key}
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
      ))}
    </>
  );
};

export default VehicleComponent;
