const PubSub = require('../helpers/pubsub.js');
const ListItemView = require('./list_item_view.js');
const LineChart = require('../models/line_chart.js');

const LineChartView = function (container) {
  this.container = container;
};

LineChartView.prototype.renderLineChart = function (historicData, companyName) {
  const dataForChart = historicData.map(stock => stock.close);
  const chartContainer = document.createElement('div');
  chartContainer.className ='line-chart';
  const lineChart = new LineChart( 'Stock value chart', companyName, dataForChart, chartContainer);
  this.container.appendChild(chartContainer);
};

module.exports = LineChartView;
