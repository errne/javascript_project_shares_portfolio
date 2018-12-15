const PubSub = require('../helpers/pubsub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Stocks = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
  this.stockData = [];
  this.portfolioData = [];
};

Stocks.prototype.bindEvents = function () {
  PubSub.subscribe('ListItemView:link-clicked', (event) => {
    this.getMoreInfoOnStock(event.detail)
    .then((stock) => {
      const amount = this.portfolioData.filter(share => share.symbol ===  event.detail);
      stock.amount = amount[0].amount;
      PubSub.publish('Stock:stock-info-loaded', stock);
      this.getHistoricData(stock.symbol);
    })
    .catch(console.error);
  });

  PubSub.subscribe('ListItemView:stock-link-clicked', (event) => {
    this.getMoreInfoOnStock(event.detail)
    .then((stock) => {
      stock.amount = 0;
      const amount = this.portfolioData.filter(share => share.symbol ===  event.detail);
      if (amount.length > 0){
        stock.amount = amount[0].amount;
      }
      PubSub.publish('Stock:stock-info-loaded', stock);
      this.getHistoricData(stock.symbol);
    })
    .catch(console.error);
  });

  PubSub.subscribe('FormView:remove-clicked', (event) => {
    this.removeShare(event.detail);
  });

  PubSub.subscribe('FormView:delete-clicked', (event) => {
    this.deleteShare(event.detail);
  })

  PubSub.subscribe('FormView:add-to-portfolio-clicked', (event) => {
    this.createNewPortfolioShare(event.detail);
  })
};

Stocks.prototype.getPortfolioData = function () {
  this.request.get()
  .then((shares) => {
  //  PubSub.publish('Stocks:portfolio-data-loaded', shares);
    console.log('get portfolio publish');
    this.portfolioData = shares;
  })
  .catch(console.error);
};

Stocks.prototype.getStocksForPortfolio = function () {
  const extraRequest = new RequestHelper('https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Health%20Care');
  extraRequest.get()
  .then((stocks) => {
    PubSub.publish('Stocks:stocks-data-loaded', stocks);
    this.stockData = stocks;
    const portfolioSymbols = this.portfolioData.map(share => share.symbol);
    this.stockData = this.stockData.filter(share => portfolioSymbols.includes(share.symbol));
    this.updatePortfolio();
  })
  .catch(console.error);
};

Stocks.prototype.getStocksLatest = function () {
  const extraRequest = new RequestHelper('https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Health%20Care');
  extraRequest.get()
  .then((stocks) => {
    PubSub.publish('Stocks:stocks-data-loaded', stocks);
  })
  .catch(console.error);
};


Stocks.prototype.getMoreInfoOnStock = function (symbol) {
  const request = new RequestHelper(`https://api.iextrading.com/1.0/stock/${symbol}/company`);
  return request.get();
};

Stocks.prototype.updatePortfolio = function () {
  this.stockData.forEach((share) => {
    const shareID = this.findID(share);
    this.request.update(shareID, share)
    })
    this.request.get()
    .then((shares) => {
      PubSub.publish('Stocks:portfolio-data-loaded', shares);
      console.log('update portfolio publish');
    })
    .catch(console.error);
};

Stocks.prototype.findID = function (share) {
  const stock = this.portfolioData.filter(stock => stock.symbol === share.symbol);
  const shareID = stock[0]._id;
  return shareID;
};

Stocks.prototype.removeShare = function (data) {
  const shareAmount = data.share.amount;
  const shareID = this.findID(data.share);
  const newShareAmount = (parseInt(shareAmount) + parseInt(data.numberOfShares));

  data.share.amount = newShareAmount;
  this.request.update(shareID, data.share)
  .then((shares) => {
    this.getPortfolioData();
    PubSub.publish('Stocks:portfolio-data-loaded', shares)
})
.catch(console.error);
};

Stocks.prototype.deleteShare = function (data) {
  const deleteID = this.findID(data);
  this.request.delete(deleteID)
  .then((shares) => {
    this.getPortfolioData();
    PubSub.publish('Stocks:portfolio-data-loaded', shares)
})
.catch(console.error);
};

Stocks.prototype.createNewPortfolioShare = function (data) {
  newShare = {
    symbol: data.stock.symbol,
    amount: data.input
  }
  this.portfolioData.push(newShare);
  this.request.post(newShare)
  .then((shares) => {
    this.getPortfolioData();
    this.getStocksForPortfolio();
    //PubSub.publish('Stocks:portfolio-data-loaded', shares)
    console.log(shares);
})
.catch(console.error);

};

Stocks.prototype.getHistoricData = function (symbol) {
  const historicDataRequest = new RequestHelper(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1y`);
  historicDataRequest.get()
  .then((historicData) => {
    PubSub.publish('Stocks:historic-data-loaded', historicData);
  })
  .catch(console.error);
}



module.exports = Stocks;
