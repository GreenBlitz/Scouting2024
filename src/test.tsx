import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TestProps {
  labels: string[];
  data: number[];
  backgroundColors: string[];
}

const Chart: React.FC<TestProps> = ({labels, data, backgroundColors}) => {


  const chardata = {
    labels,
    datasets: [
      {
        data,
        backgroundColors,
      },
    ]
  }

  const options = {
    plugins: {
      title: {
        display: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Pie data={chardata} options={options} />
    </div>
  );
};

export default Chart;