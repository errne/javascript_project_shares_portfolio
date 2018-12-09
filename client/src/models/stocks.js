const PubSub = require('../helpers/pubsub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Stocks = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
  this.stockData = [];
  this.portfolioData = [];
};

Stocks.prototype.getPortfolioData = function () {
  this.request.get()
  .then((shares) => {
    PubSub.publish('Stocks:portfolio-data-loaded', shares);
    console.log(shares);
  })
  .catch(console.error);
};


Stocks.prototype.getStockData = function () {
  const newRequest = new Request('https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Health%20Care');
  newRequest.get()
  .then((stocks) => {
    PubSub.publish('Stocks:stocks-data-loaded', stocks);
  })
  .catch(console.error);
};


module.exports = Stocks;
