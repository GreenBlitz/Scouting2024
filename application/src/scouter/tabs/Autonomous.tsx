import React, { useRef } from "react";
import CounterQuery from "../querytypes/CounterQuery";
import AutoMap from "../querytypes/AutoMap";
interface AutonomousProps {}

const Autonomous: React.FC<AutonomousProps> = () => {
  const imagePath = "./src/assets/Crescendo Map.png";

  return (
    <>
      <div className="map-buttons">
        <div className="speaker-auto">
          <h2>SPEAKER</h2>
          <br />
          <CounterQuery name={"Speaker/Auto/Score"} color="#12a119" />
          <h3>SCORE</h3>
          <br />
          <CounterQuery name={"Speaker/Auto/Miss"} color="#8f0a0e" />
          <h3>MISS</h3>
        </div>
      </div>
      <br />
      <AutoMap imagePath={imagePath} />
    </>
  );
};

export default Autonomous;
