import ChartJS from 'chart.js/auto';
const chartAreaBackgroundPlugin = {
  id: 'chartAreaBackground',
  beforeDraw(chart, args, options) {
    const { ctx, chartArea: { left, top, width, height } } = chart;
    ctx.save();
    ctx.fillStyle = options.backgroundColor || 'pink';
    ctx.strokeStyle = options.borderColor || 'black';
    ctx.lineWidth = options.borderWidth || 2;
    ctx.fillRect(left, top, width, height);
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  }
};
ChartJS.register(chartAreaBackgroundPlugin);

const ConsumpBarChart = {
  type: 'bar',
  data: {
    labels: '',
    datasets: [{
      label: 'Consumption Cost',
      fill: false,
      backgroundColor: 'blue',
      borderColor: 'blue',
      data: '',
    },],

  },
  options: {
    responsive: true,
    layout: {
      padding: {
        left: 20,
        right: 10,
        top: 30,
        bottom: 5,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 10,
            weight: 'bold'
          }
        }
      },
      chartAreaBackground: {
        backgroundColor: '#f050f8',
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      x: {
        type:'time',
        ticks: {
          color: 'white',
          font: {
            size: 12,
            family: 'Arial',
          },
        },
        time: {
          unit: 'day',
        },
         display: true,
        title: {
          display: true,
          text: 'Date',
          color: 'white',
          font: {
            size: 20,
            weight: 'bold'
          }
        },
      },
      y: {
        type: 'linear',
        display: true,
        ticks: {
          color: 'white',
          font: {
            size: 12,
            family: 'Arial', 
          }
        },
        title: {
          display: true,
          text: '£ (pounds)',
          color: 'white',
          font: {
            size: 20,
            weight: 'bold'
          }
        }
      }
    }
  },
};

export default ConsumpBarChart;
