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

const PieChart = ({success, unsucess}: {success: number, unsucess: number}) => {
	const data = {
		labels: ['Төлсөн', 'Төлөөгүй'],
		datasets: [
		  {
			data: [success, unsucess], // Example data: population percentages
			backgroundColor: [
			  '#3cba9f', // Success
			  '#c45850', // UnSuccess
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