import React, { useState } from "react";
import { renderStrategyNavBar } from "../App";
import {
  FRCTeamList,
  getMatchesByCriteria,
  Match,
  Note,
  sortMatches,
} from "../Utils";
import AutoChart from "./charts/AutoChart";

interface AutoTabProps {}
type NotePercenteges = [Note, number][];
function getAutos(matches: Match[]): [NotePercenteges, number][] {
  const matchesNotes: Note[][] = matches.map((match) =>
    JSON.parse(match["Automap/Notes"])
  );
  const bitMap = matchesNotes.map((matchNotes) =>
    matchNotes.map((note) => note.color !== "orange")
  );
  function isBoolArraySame(arr1: boolean[], arr2: boolean[]) {
    return arr1.every((value, index) => value === arr2[index]);
  }

  const samies: number[][] = [];
  bitMap.forEach((bools, boolsIndex) => {
    let isIn = false;
    samies.forEach((samie) => {
      if (isBoolArraySame(bitMap[samie[0]], bools)) {
        isIn = true;
        samie.push(boolsIndex);
      }
    });
    if (!isIn) {
      samies.push([boolsIndex]);
    }
  });

  const percentages: NotePercenteges[] = samies.map((samie) => {
    const sums: [Note, number][] = matchesNotes[samie[0]].map((note) => {
      return [note, 0];
    });
    samie.map((samieIndex) => {
      matchesNotes[samieIndex].map((note, index) => {
        sums[index] = [note, sums[index][1] + 1];
      });
    });
    return sums.map(([note, sum]) => {
      return [note, sum / samie.length];
    });
  });
  return percentages.map((percentage, index) => [
    percentage,
    samies[index].length,
  ]);
}

const AutoTab: React.FC<AutoTabProps> = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [recency, setRecency] = useState<number>(0);

  const recentMatches = sortMatches([...matches]);
  if (recency > 0 && recency < recentMatches.length) {
    recentMatches.splice(0, recentMatches.length - recency);
  }

  return (
    <>
      {renderStrategyNavBar()}
      <br />
      <label htmlFor="team number">Team Number</label>

      {getAutos(recentMatches).map((auto, index) => (
        <React.Fragment key={index}>
          <h2>{auto[1]}</h2>
          <AutoChart width={360 * 0.8} height={240} notes={auto[0]} />
        </React.Fragment>
      ))}

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
