import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
  Tooltip,
  PointElement,
  ArcElement
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Legend, Tooltip ,PointElement,ArcElement);

const PieChart = () => {
	const data = {
		labels: ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'],
		datasets: [
		  {
			data: [16, 59, 9.8, 7.6, 0.5, 6.5], // Example data: population percentages
			backgroundColor: [
			  '#3e95cd', // Africa
			  '#8e5ea2', // Asia
			  '#3cba9f', // Europe
			  '#e8c3b9', // North America
			  '#c45850', // Oceania
			  '#FFCE56', // South America
			],
			borderColor: '#fff',
			borderWidth: 1,
		  },
		],
	  };
	const config :any= {
		type: 'pie',
		data: data,
		options: {
		  responsive: true,
		  plugins: {
			legend: {
			  position: 'top',
			  display:false
			},
			title: {
			  display: true,
			  text: 'Chart.js Pie Chart'
			}
		  }
		},
	  };
	return(
		<div className="w-full border p-4 bg-white rounded-md">
      <div className='max-h-[400px]'>
        <Pie data={data} options={config} />
        </div>
    </div>
	)
}

export default PieChart