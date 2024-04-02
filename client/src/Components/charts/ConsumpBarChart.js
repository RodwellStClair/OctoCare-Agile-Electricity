import React from 'react'
import ConsumpBarConfig from './ConsumpBarConfig';
import { Bar } from "react-chartjs-2";
import ChartJS from 'chart.js/auto';
import { TimeScale } from 'chart.js';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import dayjs from 'dayjs';

ChartJS.register(TimeScale)

function ConsumpBarChart({ConsumpData }) {

  ConsumpBarConfig.data.labels = ConsumpData?.map((item) => dayjs(item.Date).format('DD-MMMM-YYYY'))
  ConsumpBarConfig.data.datasets[0].data = ConsumpData?.map((item) => item.Daycost)
  return (
      <Bar
        data={ConsumpBarConfig.data}
        options={ConsumpBarConfig.options}
      ></Bar>
  )
}

export default ConsumpBarChart
