const PubSub = require('../helpers/pubsub.js');

const StockDetailView = function (container) {
  this.container = container;

};

StockDetailView.prototype.bindEvents = function () {
  PubSub.subscribe('Stock:stock-info-loaded'), (event) => {
    this.renderStockDetail(event.detail);
    console.log('sdkjv', event.detail);
  }
};

StockDetailView.prototype.renderStockDetail = function (stock) {
  console.log(stock);
  const stockDetailContainer = document.createElement('div');
  stockDetailContainer.className = 'stock-detail';

  const name = document.createElement('h3');
  name.className = 'stock-name';
  name.textContent = stock.companyName;
  stockDetailContainer.appendChild(name);

  const symbol = document.createElement('p');
  symbol.className = 'stock-symbol';
  symbol.textContent = stock.symbol;
  stockDetailContainer.appendChild(symbol);

  const industry = document.createElement('p');
  industry.className = 'stock-industry';
  industry.textContent = stock.industry;
  stockDetailContainer.appendChild(industry);

  const description = document.createElement('p');
  description.className = 'stock-description';
  description.textContent = stock.description;
  stockDetailContainer.appendChild(description);

  const website = document.createElement('p');
  website.className = 'stock-website';
  website.textContent = stock.website;
  stockDetailContainer.appendChild(website);

  const ceo = document.createElement('p');
  ceo.className = 'stock-ceo';
  ceo.textContent = stock.ceo;
  stockDetailContainer.appendChild(ceo);

};

module.exports = StockDetailView;
