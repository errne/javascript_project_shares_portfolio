const PubSub = require('../helpers/pubsub.js');
const ListItemView = require('./list_item_view.js');

const PortfolioListView= function (container) {
  this.container = container;
  console.log("container", this.container);
};

PortfolioListView.prototype.bindEvents = function () {
  PubSub.subscribe('Stocks:portfolio-data-loaded', (event) => {
    this.render(event.detail);
    console.log('snlkd');
  })
};

PortfolioListView.prototype.render = function (shares) {
  this.container.innerHTML = '';
  const listItemView = new ListItemView(this.container);
  Array.from(shares).forEach((banana) => listItemView.renderPortfolio(banana));
  console.log(shares);
  //console.log(banana);
};
//
// ClassName.prototype.methodName = function () {
//
// renderPortfolio(
// };


module.exports = PortfolioListView;
