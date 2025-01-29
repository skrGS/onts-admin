import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
  Tooltip,
  PointElement,
  BarElement
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Legend, Tooltip ,PointElement , BarElement);

export function BarChart() {
	const options:any = {
		legend: { display: false },
		title: {
		  display: true,
		  text: 'Predicted world population (millions) in 2050'
		}
	}
	const data = {
		labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
		datasets: [
		  {
			label: "Population (millions)",
			backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
			data: [2478,5267,734,784,433]
		  }
		]
	}
	return(
		<div className='w-full border p-4 bg-white rounded-md'>
			<Bar data={data} options={options}/>
		</div>
	)
}