//import chartdata from "./chartdata";
import chartconfig from "./chartconfig";
import { Line } from "react-chartjs-2";
import ChartJS from 'chart.js/auto';
import { TimeScale } from 'chart.js';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

ChartJS.register(TimeScale)

function LineChart({consumpData}) {
 chartconfig.data.labels = consumpData.map((item) => item.interval_start)
 chartconfig.data.datasets[0].data = consumpData.map((item) => item.consumption)
 
   return (
    <div><Line
      data={chartconfig.data}
      options={chartconfig.options}
    ></Line></div>
  )
}

export default LineChart
