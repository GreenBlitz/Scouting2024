import React, { useRef } from "react";
import CounterQuery from "../querytypes/CounterQuery";
import AutoMap from "../querytypes/AutoMap";
interface AutonomousProps {}

const Autonomous: React.FC<AutonomousProps> = () => {
  return (
    <>
      <div className="map-buttons">
        <div className="speaker-auto">
          <h3>SCORE </h3>
          <br />

          <CounterQuery name={"Speaker/Auto/Score"} color="#12a119" />
        </div>
        <div className="speaker-auto">
          <h3>MISS</h3>
          <br />

          <CounterQuery name={"Speaker/Auto/Miss"} color="#8f0a0e" />
        </div>
      </div>
      <br />
      <AutoMap
        side={
          localStorage.getItem("Queries/Game Side") === "Red" ? "red" : "blue"
        }
      />
    </>
  );
};

export default Autonomous;
