const PubSub = require('../helpers/pubsub.js');

const ListItemView = function (container) {
  this.container = container;
};

ListItemView.prototype.renderPortfolio = function (share) {
  const shareContainer = document.createElement('div');
  shareContainer.className = 'share';

  const name = document.createElement('h3');
  name.className = 'share-name';
  name.textContent = share.companyName;
  shareContainer.appendChild(name);

  const symbol = document.createElement('p');
  symbol.className = 'share-symbol';
  symbol.textContent = share.symbol;
  shareContainer.appendChild(symbol);

  // const latestPrice = document.createElement('p');
  // latestPrice.className = 'share-latestPrice';
  // latestPrice.textContent = share.latestPrice;
  // shareContainer.appendChild(latestPrice);

  const amountOfShares = document.createElement('p');
  amountOfShares.className = 'share-amount';
  amountOfShares.textContent = share.amount;
  shareContainer.appendChild(amountOfShares);

  this.container.appendChild(shareContainer);
};


module.exports = ListItemView;
