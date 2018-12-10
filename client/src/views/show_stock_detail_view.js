const StockFormView = require('./stock_form_view.js');
const StockDetailView = require('./stock_detail_view.js');

const ShowStockDetailView = function (container, symbol) {
  this.container = container;
  this.symbol = symbol;
};

ShowStockDetailView.prototype.render = function () {
  this.container.innerHTML = '';
  // const stockFormView = new StockFormView(this.symbol);
  const stockDetailView = new StockDetailView();
  // stockFormView.renderForm();
  stockDetailView.renderStockDetail();
  this.container.appendChild(stockDetailView);
  // this.container.appendChild(stockFormView);
  console.log('dfkjf');
};

module.exports = ShowStockDetailView;
