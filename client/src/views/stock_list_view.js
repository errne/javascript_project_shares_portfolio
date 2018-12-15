const PubSub = require('../helpers/pubsub.js')
const ListItemView = require('./list_item_view.js');

const StockListView= function (container) {
  this.container = container;
  this.allShares = null;
};

StockListView.prototype.bindEvents = function () {
  PubSub.subscribe('Stocks:stocks-data-loaded', (event) => {
    const chart = event.detail;
    this.allShares = event.detail;
  })
};

StockListView.prototype.render = function () {
  this.container.innerHTML = '';
  const listItemView = new ListItemView(this.container);
  this.allShares.sort(function(a,b) {
    if (a.change < b.change)
  return 1;
if (a.change > b.change)
return -1;
return 0;
});
  this.allShares.forEach((share) => listItemView.renderStockList(share));
};

module.exports = StockListView;
