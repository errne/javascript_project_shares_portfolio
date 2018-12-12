const PubSub = require('../helpers/pubsub.js');
const ListItemView = require('./list_item_view.js');
const ChartHelper = require('../helpers/chart_helper.js')
const PieChart = require('../models/pie_chart.js');

const PortfolioListView = function (container) {
  this.container = container;
};

PortfolioListView.prototype.bindEvents = function () {
  PubSub.subscribe('Stocks:portfolio-data-loaded', (event) => {
    this.render(event.detail);
    this.renderPieChart(event.detail);
  })
};

PortfolioListView.prototype.render = function (shares) {
  this.container.innerHTML = '';
  const listItemView = new ListItemView(this.container);
  shares.forEach((stockInPortfolio) => listItemView.renderPortfolio(stockInPortfolio));
};

PortfolioListView.prototype.renderPieChart = function (shares) {
  const dataForChart = ChartHelper(shares);
  const chartContainer = document.createElement('div');
  chartContainer.className ='pie-chart';
  const pieChart = new PieChart('Portfolio diversification chart', dataForChart, chartContainer);
  this.container.appendChild(chartContainer);
};

module.exports = PortfolioListView;
