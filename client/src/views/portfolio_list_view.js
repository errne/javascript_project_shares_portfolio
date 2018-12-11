const PubSub = require('../helpers/pubsub.js');
const ListItemView = require('./list_item_view.js');

const PortfolioListView = function (container) {
  this.container = container;
};

PortfolioListView.prototype.bindEvents = function () {
  PubSub.subscribe('Stocks:portfolio-data-loaded', (event) => {
    this.render(event.detail);
  })
};

PortfolioListView.prototype.render = function (shares) {
  this.container.innerHTML = '';
  const listItemView = new ListItemView(this.container);
  shares.forEach((stockInPortfolio) => listItemView.renderPortfolio(stockInPortfolio));
};



module.exports = PortfolioListView;
