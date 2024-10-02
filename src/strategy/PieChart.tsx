import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  pieData: Record<string, [number, string]>;
}

const PieChart: React.FC<PieChartProps> = ({ pieData }) => {
  const names = Object.keys(pieData);
  const data = Object.values(pieData).map(([num, _]) => {
    return num;
  });
  const backgroundColors = Object.values(pieData).map(([_, color]) => {
    return color;
  });
  console.log(backgroundColors);

  const chartData = {
    names,
    datasets: [
      {
        data,
        backgroundColors,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
