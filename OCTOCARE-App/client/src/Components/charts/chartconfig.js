
const chartconfig = {
  type: 'line',
  data: {
    labels: '',
    datasets: [{
      label: 'Unfilled',
      fill: false,
      backgroundColor: 'blue',
      borderColor: 'blue',
      data: '',
    },]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'DD-MMM'
          }
        },
        display: true,
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  },
};

export default chartconfig;
