import React, { useState } from "react";
import { renderStrategyNavBar } from "../App";
import { FRCTeamList, getMatchesByCriteria, Match, sortMatches } from "../Utils";
import { TeamData } from "../TeamData";

interface AutoTabProps {}

const AutoTab: React.FC<AutoTabProps> = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [recency, setRecency] = useState<number>(0);

  const recentMatches = sortMatches([...matches]);
  if (recency > 0 && recency < recentMatches.length) {
    recentMatches.splice(0, recentMatches.length - recency);
  }
  const teamData = new TeamData(recentMatches);

  return (
    <>
      {renderStrategyNavBar()}
      <br />
      <label htmlFor="team number">Team Number</label>

      <select
        id="team number"
        name="team number"
        onChange={async (event) =>
          setMatches(
            await getMatchesByCriteria(
              "Team Number",
              event.target.value.slice(0, 4) || "0"
            )
          )
        }
      >
        {FRCTeamList.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      <label htmlFor="recency">Filter By Recency</label>
      <input
        type="number"
        id="recency"
        name="recency"
        onChange={(event) => setRecency(parseInt(event.target.value))}
        min={1}
        max={matches.length}
        defaultValue={matches.length}
      />
    </>
  );
};
export default AutoTab;
