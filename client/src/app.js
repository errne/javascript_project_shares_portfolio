const Stocks = require('./models/stocks.js');
const PortfolioListView = require('./views/portfolio_list_view.js');
const StockListView = require('./views/stock_list_view.js');
const StockDetailView = require('./views/stock_detail_view.js');
const ShowStockDetailView = require('./views/show_stock_detail_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const stocksPortfolio = new Stocks('http://localhost:3000/api/portfolio/');
  stocksPortfolio.getPortfolioData();
  stocksPortfolio.getStocksForPortfolio();

  const stockList = document.querySelector('.stocklist');

  const portfolioListView = new PortfolioListView(stockList);
  portfolioListView.bindEvents();

  const stockView = new StockListView(stockList);
  stockView.bindEvents();


// -------  LINKS IN HEADER -------------- //
  const portfolioLink = document.querySelector('#portfolio_link');
  portfolioLink.addEventListener('click', (event) => {
    event.preventDefault();
    const portfolioListView = new PortfolioListView(stockList);
    portfolioListView.bindEvents();
    stocksPortfolio.getStocksForPortfolio();
    // render triggered by sub callback in bindEvents();
  });

  const stocksLink = document.querySelector('#stocks_link');
  portfolioLink.addEventListener('click', (event) => {
    event.preventDefault();
    const stocksListView = new StocksListView(stockList);
    stockListView.bindEvents();
    stocksPortfolio.getStocksForPortfolio();
    // render not triggered by sub callback in bindEvents(), so...
    stockListView.render();
    });
// ----------- LINKS IN HEADER ----------------//



  const stockDetailView = new StockDetailView(stockList);
  stockDetailView.bindEvents();
// where to do correct bind events
});
