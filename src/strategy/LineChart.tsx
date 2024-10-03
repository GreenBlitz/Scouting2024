import { Chart, LineElement, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(LineElement, PointElement);

type DataSet = [Color, Record<string, number>];
type Color = string;
interface LineChartProps {
  dataSets: Record<string, DataSet>;
}
const LineChart: React.FC<LineChartProps> = ({ dataSets }) => {
  const data = {
    labels: Object.keys(Object.values(dataSets)[0][1]),

    datasets: Object.entries(dataSets).map(([dataSetName, dataSetValue]) => {
      return {
        label: dataSetName,
        borderColor: dataSetValue[0],
        tension: 0.2,
        data: Object.values(dataSetValue[1]),
      };
    }),
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
