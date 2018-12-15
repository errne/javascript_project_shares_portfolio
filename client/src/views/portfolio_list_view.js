const PubSub = require('../helpers/pubsub.js');
const ListItemView = require('./list_item_view.js');
const ChartHelper = require('../helpers/chart_helper.js')
const PieChart = require('../models/pie_chart.js');

const PortfolioListView = function (container) {
  this.container = container;
};

PortfolioListView.prototype.bindEvents = function () {
  PubSub.subscribe('Stocks:portfolio-data-loaded', (event) => {
    this.renderPieChart(event.detail);
    this.renderSummary(event.detail);
    this.render(event.detail);
  })
};

PortfolioListView.prototype.render = function (shares) {
  const listItemView = new ListItemView(this.container);
  shares.forEach((stockInPortfolio) => listItemView.renderPortfolio(stockInPortfolio));
};



PortfolioListView.prototype.renderPieChart = function (shares) {
  this.container.innerHTML = '';
  const dataForChart = ChartHelper(shares);
  const chartContainer = document.createElement('div');
  chartContainer.className ='pie-chart';
  const pieChart = new PieChart('Portfolio Diversification Chart', dataForChart, chartContainer);
  this.container.appendChild(chartContainer);
};

PortfolioListView.prototype.renderSummary = function (sharesHeld) {
  const getPercentage= (a,b) => {
    return (b === 0) ? 0 : ((a/b) * 100).toFixed(2);
  };
  // Calc info
  const newTotal = sharesHeld.reduce((sum, share) =>{
    return sum + (share.latestPrice * share.amount);
  }, 0);
  const change = sharesHeld.reduce((sum, share) =>{
    return sum + (share.change * share.amount);
  }, 0);
  const oldTotal = newTotal - change;
  const percentage = getPercentage(change, oldTotal);

  // Render to page
  const tabSummary = document.createElement('div');
  tabSummary.classList = 'tab_summary';
  const totalElem = document.createElement('p');
  totalElem.textContent = `Portfolio Total: $${newTotal.toFixed(2)}`
  const changeElem = document.createElement('p');
  changeElem.textContent = `Portfolio Change: $${change.toFixed(2)}`
  const percentElem = document.createElement('p');
  percentElem.textContent = `Percentage Change: ${percentage}%`

  tabSummary.appendChild(totalElem);
  tabSummary.appendChild(changeElem);
  tabSummary.appendChild(percentElem);
  this.container.appendChild(tabSummary);
};


module.exports = PortfolioListView;
