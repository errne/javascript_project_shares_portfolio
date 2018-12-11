const PubSub = require('../helpers/pubsub.js');

const StockFormView = function (container, stock) {
  this.container = container;
  this.stock = stock;
};

StockFormView.prototype.render = function (stock) {

  const input = document.createElement('input');
  input.type = 'number';
  input.addClassName = 'input-shares';
  this.container.appendChild(input);

  this.renderRemoveButton(input, stock);


};

StockFormView.prototype.renderRemoveButton = function (input, stock) {
  console.log('input', input);
  console.log('stock', stock);
  const removeButton = document.createElement('button');
  const text = document.createTextNode('add/remove shares');
  removeButton.appendChild(text);

  this.container.appendChild(removeButton);

  removeButton.addEventListener('click', (event) => {
    event.preventDefault();
    const data = {
      numberOfShares: input.value,
      share: stock
    };
    PubSub.publish('FormView:remove-clicked', data);
  });

  const deleteButton = document.createElement('button');
  const delBtnText = document.createTextNode('delete all shares');
  deleteButton.appendChild(delBtnText);

  this.container.appendChild(deleteButton);

  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    PubSub.publish('FormView:delete-clicked', stock);
  });
};


module.exports = StockFormView;
