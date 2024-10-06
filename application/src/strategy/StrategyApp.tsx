import LineChart from "./LineChart";
import PieChart from "./PieChart";

interface StrategyAppProps {}
const StrategyApp: React.FC<StrategyAppProps> = () => {
  const team4590: Record<string, Record<string, string>> = {
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
        height={300}
        width={400}
        dataSets={{
          Speaker: ["pink", getAsLine(team4590, "Speaker")],
          Amp: ["yellow", getAsLine(team4590, "Amp")],
          Pass: ["purple", getAsLine(team4590, "Pass")],
        }}
      />
      <PieChart pieData={{}} />
    </>
  );
};

export default StrategyApp;
