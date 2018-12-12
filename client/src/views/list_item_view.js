const PubSub = require('../helpers/pubsub.js');
const ShowStockDetailView = require('./show_stock_detail_view.js');

const ListItemView = function (container) {
  this.container = container;
};

ListItemView.prototype.renderPortfolio = function (share) {
  const shareContainer = document.createElement('div');
  shareContainer.className = 'share';

  const link = document.createElement('a');
  link.setAttribute("href", "");
  shareContainer.appendChild(link);

  const name = document.createElement('h3');
  name.className = 'share-name';
  name.textContent = share.companyName;
  link.appendChild(name);

  link.addEventListener('click', (event) => {
    event.preventDefault();
    PubSub.publish('ListItemView:link-clicked', share.symbol);
  });

  const symbol = document.createElement('p');
  symbol.className = 'share-symbol';
  symbol.textContent = share.symbol;
  shareContainer.appendChild(symbol);

  const latestPrice = document.createElement('p');
  latestPrice.className = 'share-latestPrice';
  latestPrice.textContent = `Latest price: $ ${share.latestPrice}`;
  shareContainer.appendChild(latestPrice);

  const priceChange = document.createElement('p');
  // priceChange.className = 'share-price-change';
  priceChange.textContent = `Change: $ ${share.change}`;
  const classColors = (share.change === 0) ? 'black' : (share.change > 0) ? 'green' : 'red';
  priceChange.classList = classColors;
  shareContainer.appendChild(priceChange);

  const amountOfShares = document.createElement('p');
  amountOfShares.className = 'share-amount';
  amountOfShares.textContent = `Holdings: ${share.amount}`;
  shareContainer.appendChild(amountOfShares);

  const totalValue = document.createElement('p');
  totalValue.className = 'total-value';
  totalValue.textContent = `Total value: $ ${share.amount * share.latestPrice}`;
  shareContainer.appendChild(totalValue);

  this.container.appendChild(shareContainer);
};

ListItemView.prototype.renderStockList = function (stock) {

  const stockContainer = document.createElement('div');
  stockContainer.className = 'stocks';

  const link = document.createElement('a');
  link.setAttribute("href", "");
  stockContainer.appendChild(link);

  const company = document.createElement('h3');
  company.className = 'company';
  company.textContent = stock.companyName;
  link.appendChild(company);

  link.addEventListener('click', (event) => {
    event.preventDefault();
    PubSub.publish('ListItemView:stock-link-clicked', stock.symbol);
  });

  const symbol = document.createElement('p');
  symbol.className = 'symbol';
  symbol.textContent = stock.symbol;
  stockContainer.appendChild(symbol);

  const latestPrice = document.createElement('p');
  latestPrice.className = 'share-latestPrice';
  latestPrice.textContent = `Latest price: $ ${stock.latestPrice}`;
  stockContainer.appendChild(latestPrice);

  const priceChange = document.createElement('p');
  // priceChange.className = 'share-price-change';
  priceChange.textContent = `Change: $ ${stock.change}`;
  const classColors = (stock.change === 0) ? 'black' : (stock.change > 0) ? 'green' : 'red';
  priceChange.classList = classColors;
  stockContainer.appendChild(priceChange);

  this.container.appendChild(stockContainer);
}


module.exports = ListItemView;
