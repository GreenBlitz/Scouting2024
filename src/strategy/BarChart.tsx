import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement);

type DataSet = [string,Record<string, [number, string]>];
interface BarChartProps {
  dataSets: DataSet[];
}
const BarChart: React.FC<BarChartProps> = ({ dataSets }) => {
  const data = {
    labels: Object.keys(dataSets[0][1]),
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
