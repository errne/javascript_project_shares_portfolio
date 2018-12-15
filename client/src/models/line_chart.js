const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

const LineChart = function(title, name, data, container) {
  const today = Date.now();
  const chart = new Highcharts.Chart({
    chart: {
      renderTo: container,
    },
    navigator: {
      series: {
        includeInCSVExport: true
      }
    },
    title: {
      text: title
    },
    series: [
      {
        name: name,
        color: "#ffac33",
        data: data
      }
    ],
    yAxis: {
      title: {
        text:  'stock values'
      }
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart      : today - 24 * 3600 * 1000 * 365,
        pointInterval   : 24 * 3600 * 1000 * 31,
        pointEnd        : today
      }
    },
    xAxis      : {
      min: today - 24 * 3600 * 1000 * 365,
      max:  today,
      allowDecimals: false,
      type         : 'datetime',

    },
  });

};


module.exports = LineChart;
