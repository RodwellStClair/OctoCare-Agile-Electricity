import React from 'react'
import tariffLineConfig from './TariffLineConfig';
import { Line } from "react-chartjs-2";
import ChartJS from 'chart.js/auto';
import { TimeScale } from 'chart.js';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import dayjs from 'dayjs';

ChartJS.register(TimeScale)

function TariffLineChart({tariffData }) {
  tariffLineConfig.data.labels = tariffData.map((item) => item.From)
  tariffLineConfig.data.datasets[0].data = tariffData.map((item) => item.Tariff)
  tariffLineConfig.options.scales.x.title.text = dayjs(tariffData[0].From).format('DD-MMMM-YYYY')
  return (
    <div className="tarrif-chart-body">
      <Line
        data={tariffLineConfig.data}
        options={tariffLineConfig.options}
      ></Line>
    </div>
  )
}

export default TariffLineChart
