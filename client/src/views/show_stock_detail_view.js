const PubSub = require('../helpers/pubsub.js');
const StockFormView = require('./stock_form_view.js');
const StockDetailView = require('./stock_detail_view.js');

const ShowStockDetailView = function (container, symbol) {
  this.container = container;
  this.symbol = symbol;
};

ShowStockDetailView.prototype.bindEvents = function () {
  PubSub.subscribe('Stock:stock-info-loaded', (event) => {
    this.render(event.detail);
  });

};

ShowStockDetailView.prototype.render = function (stock) {
  this.container.innerHTML = '';
  this.container.className = 'show-view';
  const stockDetailView = new StockDetailView(this.container);
  stockDetailView.render(stock);

  const stockFormView = new StockFormView(this.container, stock);
  stockFormView.render(stock);
};

module.exports = ShowStockDetailView;
