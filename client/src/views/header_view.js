const PubSub = require('../helpers/pubsub.js');

const HeaderView = function(container) {
  this.container = container;
  this.total = 0;
  this.change = 0;
}

HeaderView.prototype.bindEvents = function () {
  PubSub.subscribe('Stocks:portfolio-data-loaded', (event) => {
    const stocksOwned = event.detail;
    this.total = stocksOwned.reduce((sum, stock) =>{
      return sum += (stock.amount * stock.price);
    }, 0);
  });
  this.renderTotal();
};

HeaderView.prototype.renderTotal = function () {
  const totalBox = document.querySelector('#total_box');
  totalBox.textContent = `${this.total}`;
  const changeBox = document.querySelector('#change_box');
  totalBox.textContent = `${this.change}`;
  const percentBox = document.querySelector('#percent_box');
  totalBox.textContent = `${(this.change/this.total) * 100}`;
};
