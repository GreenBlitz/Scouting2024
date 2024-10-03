import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import RadarComponent from "./RadarChart";
import TableChart from "./TableChart";

interface StrategyAppProps {}
const StrategyApp: React.FC<StrategyAppProps> = () => {
  return (
    <>
      <RadarComponent
        inputs={[
          { name: "amountOfApples", max: 100, value: 15.5 },
          { name: "pain", max: 100, value: 99 },
          { name: "RP ", max: 100, value: 55 },
          { name: "defend time", max: 100, value: 50 },
          { name: "climb spots", max: 100, value: 70 },
          { name: "violatin", max: 100, value: 40 },
          { name: "bullshit 1", max: 100, value: 65 },
          { name: "bullshit 2", max: 100, value: 10 },
        ]}
        size={800}
        substeps={10}
      />
      <TableChart
        matches={[
          { Qual: "1", Team: "4590", Speaker: "6", Amp: "3" },
          { Qual: "2", Team: "1690", Speaker: "2", Amp: "4" },
          { Qual: "3", Team: "4590", Speaker: "6", Amp: "5" },
        ]}
        calculations={{
          Score: (match) =>
            parseInt(match["Speaker"]) * 2.5 + parseInt(match["Amp"]) + "",
        }}
        idName={"Qual"}
        height={500}
        widthOfItem={130}
      />
      <PieChart pieData={{ Dror: [90, ""], Talmi: [100, "rgb(100,200,30)"] }} />
      <BarChart
        dataSets={{
          1690: [
            "rgb(244,200,200)",
            {
              Amp: 6,
              Speaker: 10,
            },
          ],
          4590: [
            "rgb(100,200,200)",
            {
              Amp: 7,
              Speaker: 5,
            },
          ],
        }}
      />
      <LineChart
        dataSets={{
          4590: [
            "rgb(100,200,200)",
            {
              Game1: 7,
              Game2: 5,
              Game3: 8,
              Game4: 4,
            },
          ],
          1690: [
            "rgb(200,100,200)",
            {
              Game1: 13,
              Game2: 8,
              Game3: 9,
              Game4: 7,
            },
          ],
        }}
      />
    </>
  );
};

export default StrategyApp;
