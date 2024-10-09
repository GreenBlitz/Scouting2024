import { useEffect, useState } from "react";
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
    function countDataFromMap(data: string, succesfulness: boolean) {
      return (
        points.filter((point) => {
          if (data === "Pass") {
            return point[0] && point[0]["data"] === "Pass";
          }
          return (
            point["data"] === data && point["successfulness"] === succesfulness
          );
        }).length + ""
      );
    }
    teamData[matchNumber] = {
      "Speaker Score": countDataFromMap("Speaker", true),
      "Speaker Miss": countDataFromMap("Speaker", false),
      "Pass Successful": countDataFromMap("Pass", true),
      "Pass Unsuccessful": countDataFromMap("Pass", false),
      "Amp Score": match[`${mapName}/Amp/Score`] + "",
      "Amp Miss": match[`${mapName}/Amp/Score`] + "",
      "Trap Score": match["Trap"] === "Scored" ? "1" : "0",
      "Trap Miss": match["Trap"] === "Miss" ? "1" : "0",
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

function getAccuracy(
  team: TeamData,
  data1: string,
  data2: string,
  recency?: number
) {
  let sum1 = 0;
  let sum2 = 0;
  const matches = Object.values(team);
  if (recency) {
    matches.splice(matches.length - recency);
  }
  matches.forEach((match) => {
    sum1 += parseInt(match[data1]);
    sum2 += parseInt(match[data2]);
  });
  return (sum1 / (sum1 + sum2)) * 100;
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
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  useEffect(() => console.log(teamData), [teamData]);

  const ampAccuracy = getAccuracy(teamData, "Amp Score", "Amp Miss");
  const speakerAccuracy = getAccuracy(
    teamData,
    "Speaker Score",
    "Speaker Miss"
  );
  const trapAccuracy = getAccuracy(teamData, "Trap Score", "Trap Miss");
  const passAccuracy = getAccuracy(
    teamData,
    "Pass Successful",
    "Pass Unsuccessful"
  );
  return (
    <div className="strategy-app">
      <div className="section">
        <h2>Scoring</h2>
        <LineChart
          height={300}
          width={400}
          dataSets={{
            Speaker: ["pink", getAsLine(teamData, "Speaker Score")],
            Amp: ["yellow", getAsLine(teamData, "Amp Score")],
            Pass: ["purple", getAsLine(teamData, "Pass Successful")],
          }}
        />
      </div>

      <div className="section">
        <h2>Miss</h2>
        <LineChart
          height={300}
          width={400}
          dataSets={{
            Speaker: ["pink", getAsLine(teamData, "Speaker Miss")],
            Amp: ["yellow", getAsLine(teamData, "Amp Miss")],
            Pass: ["purple", getAsLine(teamData, "Pass Unsuccessful")],
          }}
        />
      </div>

      <div className="section">
        <h2>Trap</h2>
        <PieChart
          pieData={getAsPie(teamData, "Trap", {
            Scored: "purple",
            Miss: "cyan",
            "Didn't Score": "yellow",
          })}
        />
      </div>

      <div className="section">
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
      </div>

      <div className="section">
        <h2>Amp Accuracy</h2>
        <PieChart
          pieData={{
            Score: [ampAccuracy, "green"],
            Miss: [100 - ampAccuracy, "crimson"],
          }}
        />
      </div>

      <div className="section">
        <h2>Speaker Accuracy</h2>
        <PieChart
          pieData={{
            Score: [speakerAccuracy, "green"],
            Miss: [100 - speakerAccuracy, "crimson"],
          }}
        />
      </div>

      <div className="section">
        <h2>Trap Accuracy</h2>
        <PieChart
          pieData={{
            Score: [trapAccuracy, "green"],
            Miss: [100 - trapAccuracy, "crimson"],
          }}
        />
      </div>

      <div className="section">
        <h2>Pass Accuracy</h2>
        <PieChart
          pieData={{
            Score: [passAccuracy, "green"],
            Miss: [100 - passAccuracy, "crimson"],
          }}
        />
      </div>

      <br />
      <button onClick={() => updateMatchesByCriteria("Team Number", "4590")}>
        Update Data
      </button>
    </div>
  );
};

export default StrategyApp;
