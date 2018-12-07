const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

MongoClient.connect('mongodb://localhost:?')
.then((client) => {
  const db = client.db('shares_portfolio');
  const stocksCollection = db.collection('stocks');
  const portfolioCollection = db.collection('portfolio');
  const Router = createRouter(stocksCollection);
  const Router = createRouter(portfolioCollection);
  app.use('/api/stocks', Router);
  app.use('/api/portfolio', Router);
})
.catch(console.err);

app.use(parser.json());

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
