const Highcharts = require('highcharts');

const PieChart = function(title, data, container) {
  const chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    title: {
      text: title
    },
    series: [
      {
        data: data
      }
    ]
  });
};

module.exports = PieChart;
