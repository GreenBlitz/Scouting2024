import React from "react";
import MapQuery from "../querytypes/MapQuery";

interface TeleoperatedProps {}

const Teleoperated: React.FC<TeleoperatedProps> = () => {
  return (
    <>
      <MapQuery
        name={"CRESCENDO"}
        side={
          localStorage.getItem("Queries/Game Side") === "Red" ? "red" : "blue"
        }
        width={540}
        height={240}
        imagePath={"./src/assets/Crescendo Map.png"}
      />
    </>
  );
};

export default Teleoperated;
