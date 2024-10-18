import React, { useEffect, useState } from "react";
import { renderStrategyNavBar } from "../App";
import {
  autoBlueNotePositions,
  FRCTeamList,
  getMatchesByCriteria,
  Match,
  Note,
  sortMatches,
} from "../Utils";
import AutoChart from "./charts/AutoChart";
import { width as autoMapWidth } from "../scouter/querytypes/AutoMap";

interface AutoTabProps {}
type NotePercenteges = [Note, number][];
function getAutos(matches: Match[]): [NotePercenteges, number][] {
  const matchesNotes: Note[][] = matches.map((match) => {
    const notes: Note[] = JSON.parse(match["Automap/Notes"]);
    return notes.some(
      (note) => note.x === autoMapWidth - autoBlueNotePositions[0].x
    )
      ? notes.map((note) => {
          return { x: autoMapWidth - note.x, y: note.y, color: note.color } as Note;
        })
      : notes;
  });
  const bitMap = matchesNotes.map((matchNotes) =>
    matchNotes.map((note) => note.color !== "orange")
  );
  function isBoolArraySame(arr1: boolean[], arr2: boolean[]) {
    return arr1.every((value, index) => value === arr2[index]);
  }

  //bro don't even try to debug from here on out
  const samieIndexes: number[][] = [];
  bitMap.forEach((bools, boolsIndex) => {
    let isIn = false;
    samieIndexes.forEach((samie) => {
      if (isBoolArraySame(bitMap[samie[0]], bools)) {
        isIn = true;
        samie.push(boolsIndex);
      }
    });
    if (!isIn) {
      samieIndexes.push([boolsIndex]);
    }
  });

  const percentages: NotePercenteges[] = samieIndexes.map((samieIndex) => {
    const sums: [Note, number][] = matchesNotes[samieIndex[0]].map((note) => {
      return [note, 0];
    });
    samieIndex.map((samieIndex) => {
      matchesNotes[samieIndex].map((note, index) => {
        sums[index] = [note, sums[index][1] + (note.color === "green" ? 1 : 0)];
      });
    });
    return sums.map(([note, sum]) => {
      return [note, sum / samieIndex.length];
    });
  });
  return percentages.map((percentage, index) => [
    percentage,
    samieIndexes[index].length,
  ]);
}

const AutoTab: React.FC<AutoTabProps> = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [recency, setRecency] = useState<number>(0);

  const [autos, setAutos] = useState<[NotePercenteges, number][]>([]);

  useEffect(() => {
    const recentMatches = sortMatches([...matches]);
    if (recency > 0 && recency < recentMatches.length) {
      recentMatches.splice(0, recentMatches.length - recency);
    }
    setAutos(getAutos(recentMatches));
    console.log(recentMatches);
  }, [matches, recency]);

  console.log(autos);

  return (
    <>
      {renderStrategyNavBar()}
      <br />

      {autos.map((auto, index) => (
        <React.Fragment key={index}>
          <h2>{auto[1]}</h2>
          <AutoChart notes={auto[0]} />
        </React.Fragment>
      ))}
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
