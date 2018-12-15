const PubSub = require('../helpers/pubsub.js');

const SummaryView = function(container) {
  this.container = container;
  this.total = 0;
  this.change = 0;
}

HeaderView.prototype.bindEvents = function () {
  PubSub.subscribe('Stocks:portfolio-data-loaded', (event) => {
    const stocksOwned = event.detail;
    this.total = stocksOwned.reduce((sum, stock) =>{

    });
    this.change = stocksOwned.reduce((sum, stock) =>{

    });
  this.renderSummary();
  });

HeaderView.prototype.renderTotal = function () {
  const totalBox = document.querySelector('#total_box');
  totalBox.textContent = `${this.total}`;
  const changeBox = document.querySelector('#change_box');
  changeBox.textContent = `${this.change}`;

  // change colour and add symbol
  const percentBox = document.querySelector('#percent_box');
  const getPercent= (a,b) => {
    return (b === 0) ? 0 : ((a/b) * 100).toFixed(2);
  }
  changeBox.textContent = `${ getPercent(this.change,this.total) }`;
  // change colour and add symbol
};

module.exports = SummaryView;
