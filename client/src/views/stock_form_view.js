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

  if (stock.amount < 1) {
    this.renderAddNewButton(stock, input);
  }


};

StockFormView.prototype.renderRemoveButton = function (input, stock) {
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

StockFormView.prototype.renderAddNewButton = function (stock, input) {
  console.log('cliking', stock);
  const addNewButton = document.createElement('button');
  const text = document.createTextNode('add to your portfolio');
  addNewButton.appendChild(text);

  this.container.appendChild(addNewButton);
  console.log(input);

  addNewButton.addEventListener('click', (event) => {
    event.preventDefault();
    const data = {
      stock: stock,
      input: input.value
    };
    console.log('render', data);
    console.log('input', input.value);
    PubSub.publish('FormView:add-to-portfolio-clicked', data);
  });
};


module.exports = StockFormView;
