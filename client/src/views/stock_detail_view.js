const PubSub = require('../helpers/pubsub.js');

const StockDetailView = function (container) {
  this.container = container;
};

StockDetailView.prototype.render = function (stock) {
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
  industry.textContent = `Industry: ${stock.industry}`;
  stockDetailContainer.appendChild(industry);

  const description = document.createElement('p');
  description.className = 'stock-description';
  description.textContent = `Description: ${stock.description}`;
  stockDetailContainer.appendChild(description);

  const website = document.createElement('a');
  website.className = 'stock-website';
  website.textContent = `Website: ${stock.website}`;
  website.href = stock.website;
  website.target = '_blank';
  stockDetailContainer.appendChild(website);

  const ceo = document.createElement('p');
  ceo.className = 'stock-ceo';
  ceo.textContent = `Company CEO: ${stock.CEO}`;
  stockDetailContainer.appendChild(ceo);

  const amount = document.createElement('p');
  amount.className = 'stock-amount';
<<<<<<< HEAD
  amount.textContent = `You own ${stock.amount} shares of this stock`;
=======
  amount.textContent = `Holdings: ${stock.amount}`;
>>>>>>> 49bceea39aeeb1bb1e9191ac4243945b0bf61b74
  stockDetailContainer.appendChild(amount);


  this.container.appendChild(stockDetailContainer);
};

module.exports = StockDetailView;
