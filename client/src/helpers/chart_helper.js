const ChartHelper = function(stocks) {
  const stockData = [];
  for(stock of stocks) {
    stockData.push({
      name: stock.symbol,
      y: (stock.latestPrice * stock.amount)
    });
  }

  return stockData;
}

module.exports = ChartHelper;
