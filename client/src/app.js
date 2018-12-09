const Stocks = require('./models/stocks.js');
const PortfolioListView = require('./views/portfolio_list_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const stocksPortfolio = new Stocks('http://localhost:3000/api/portfolio/');
  stocksPortfolio.getPortfolioData();
  stocksPortfolio.getStocksForPortfolio();

  const stockList = document.querySelector('.stocklist');
  const portfolioListView = new PortfolioListView(stockList);
  portfolioListView.bindEvents();

});
