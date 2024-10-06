import { useState } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

type Team = Record<string, Record<string, string>>;
interface StrategyAppProps {}
const StrategyApp: React.FC<StrategyAppProps> = () => {
  const [matches, setMatches] = useState<Record<string, string>[]>();

  const team4590: Team = {
    Q1: { Speaker: "8", Amp: "4", Trap: "Scored", Climb: "Self", Pass: "4" },
    Q2: {
      Speaker: "2",
      Amp: "9",
      Trap: "Not Scored",
      Climb: "Team",
      Pass: "1",
    },
    Q3: { Speaker: "5", Amp: "4", Trap: "Missed", Climb: "Park", Pass: "3" },
  };

  function getAsLine(team: Team, data: string) {
    const dataSet: Record<string, number> = {};
    Object.entries(team).forEach(([qual, match]) => {
      dataSet[qual] = parseInt(match[data]);
    });
    return dataSet;
  }

  function getAsPie(
    team: Team,
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
  return (
    <>
      <LineChart
        height={300}
        width={400}
        dataSets={{
          Speaker: ["pink", getAsLine(team4590, "Speaker")],
          Amp: ["yellow", getAsLine(team4590, "Amp")],
          Pass: ["purple", getAsLine(team4590, "Pass")],
        }}
      />
      <h2>Trap</h2>
      <PieChart
        pieData={getAsPie(team4590, "Trap", {
          Scored: "purple",
          Missed: "cyan",
          "Not Scored": "yellow",
        })}
      />
      <h2>Climb</h2>
      <PieChart
        pieData={getAsPie(team4590, "Climb", {
          Self: "purple",
          Harmony: "cyan",
          Team: "yellow",
          Park: "orange",
          "Not On Stage": "red",
        })}
      />
      <button onClick={() => updateMatchesByCriteria()}>Sigma</button>
    </>
  );
};

export default StrategyApp;
