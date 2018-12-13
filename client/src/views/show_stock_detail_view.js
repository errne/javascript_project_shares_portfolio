const PubSub = require('../helpers/pubsub.js');
const StockFormView = require('./stock_form_view.js');
const StockDetailView = require('./stock_detail_view.js');
const LineChartView = require('./line_chart_view.js');

const ShowStockDetailView = function (container, symbol) {
  this.container = container;
  this.symbol = symbol;
  this.name = null;
};

ShowStockDetailView.prototype.bindEvents = function () {
  PubSub.subscribe('Stock:stock-info-loaded', (event) => {
    this.name = event.detail.companyName;
    this.render(event.detail);
  });
  PubSub.subscribe('Stocks:historic-data-loaded', (event) => {
    this.renderLineChart(event.detail);
  });

};

ShowStockDetailView.prototype.render = function (stock) {
  this.container.innerHTML = '';
  this.container.className = 'show-view';
  const stockDetailView = new StockDetailView(this.container);
  stockDetailView.render(stock);

  const stockFormView = new StockFormView(this.container, stock);
  stockFormView.render(stock);
<<<<<<< HEAD


  const stockDetailView = new StockDetailView(this.container);
  stockDetailView.render(stock);

=======
>>>>>>> 49bceea39aeeb1bb1e9191ac4243945b0bf61b74
};

ShowStockDetailView.prototype.renderLineChart = function (historicData) {
  const lineChartView = new LineChartView(this.container);
  lineChartView.renderLineChart(historicData, this.name);
}

module.exports = ShowStockDetailView;
