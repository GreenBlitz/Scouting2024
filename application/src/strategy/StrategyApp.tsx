import LineChart from "./LineChart";

interface StrategyAppProps {}
const StrategyApp: React.FC<StrategyAppProps> = () => {
  const team4590: Record<string, Record<string, string>> = {
    Q1: { Speaker: "8", Amp: "4", Trap: "Scored", Climb: "Self" },
    Q2: { Speaker: "2", Amp: "9", Trap: "Not Scored", Climb: "Team" },
    Q3: { Speaker: "5", Amp: "4", Trap: "Missed", Climb: "Park" },
  };

  function getAsLine(
    team: Record<string, Record<string, string>>,
    data: string
  ) {
    const dataSet: Record<string, number> = {};
    Object.entries(team).forEach(([qual, match]) => {
      dataSet[qual] = parseInt(match[data]);
    });
    return dataSet;
  }
  return (
    <>
      <LineChart
        dataSets={{ Speaker: ["pink", getAsLine(team4590, "Speaker")] }}
      />
    </>
  );
};

export default StrategyApp;
