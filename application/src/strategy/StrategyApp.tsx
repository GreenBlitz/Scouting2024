import { useState } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

type TeamData = Record<string, Record<string, string>>;
const matchName = "Qual";
const mapName = "CRESCENDO";
interface StrategyAppProps {}

function getTeamData(teamMatches: Record<string, string>[]): TeamData {
  const teamData: TeamData = {};
  teamMatches.forEach((match) => {
    const points: any[] = JSON.parse(match[mapName + "/Points"]);
    const matchNumber = match[matchName];
    function countDataFromMap(data: string) {
      return (
        points.filter((point) => {
          if (data === "Pass") {
            return point[0] && point[0]["data"] === "Pass";
          }
          return point["data"] === data && point["successfulness"] === true;
        }).length + ""
      );
    }
    teamData[matchNumber] = {
      Speaker: countDataFromMap("Speaker"),
      Pass: countDataFromMap("Pass"),
      Amp: match[`${mapName}/Amp/Score`] + "",
    };

    Object.entries(match)
      .filter(([key, _]) => key !== matchName && key !== mapName)
      .forEach(([key, value]) => (teamData[matchNumber][key] = value));
  });
  return teamData;
}

function getAsLine(team: TeamData, data: string) {
  const dataSet: Record<string, number> = {};
  Object.entries(team).forEach(([qual, match]) => {
    dataSet[qual] = parseInt(match[data]);
  });
  return dataSet;
}

function getAsPie(
  team: TeamData,
  data: string,
  colorMap: Record<string, string>
) {
  const dataSet: Record<string, [number, string]> = {};
  Object.entries(team).forEach(([_, match]) => {
    const dataValue = match[data];
    if (!dataSet[dataValue]) {
      dataSet[dataValue] = [0, colorMap[dataValue]];
    }
    dataSet[dataValue][0]++;
  });
  return dataSet;
}
const StrategyApp: React.FC<StrategyAppProps> = () => {
  const [matches, setMatches] = useState<Record<string, string>[]>([]);

  const teamData = getTeamData(matches);

  async function updateMatchesByCriteria(field?: string, value?: string) {
    const searchedField = field && value ? `/${field}/${value}` : ``;
    fetch(`http://192.168.1.126:4590/Matches${searchedField}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMatches(data);
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  return (
    <>
      <LineChart
        height={300}
        width={400}
        dataSets={{
          Speaker: ["pink", getAsLine(teamData, "Speaker")],
          Amp: ["yellow", getAsLine(teamData, "Amp")],
          Pass: ["purple", getAsLine(teamData, "Pass")],
        }}
      />
      <h2>Trap</h2>
      <PieChart
        pieData={getAsPie(teamData, "Trap", {
          Scored: "purple",
          Missed: "cyan",
          "Didn't Score": "yellow",
        })}
      />
      <h2>Climb</h2>
      <PieChart
        pieData={getAsPie(teamData, "Climb", {
          "Climbed Alone": "purple",
          Harmony: "cyan",
          Team: "yellow",
          Park: "orange",
          "Not On Stage": "red",
        })}
      />
      <button onClick={() => updateMatchesByCriteria("Team Number", "4590")}>
        Sigma
      </button>
    </>
  );
};

export default StrategyApp;
