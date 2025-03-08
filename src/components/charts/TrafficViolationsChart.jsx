import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TrafficViolationsChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Traffic Violations by Type'
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Bar options={options} data={data} />
    </div>
  );
};

export default TrafficViolationsChart;