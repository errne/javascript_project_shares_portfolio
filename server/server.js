const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouterPortfolio= require('./helpers/create_router_portfolio.js');


const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('shares_portfolio');
  const portfolioCollection = db.collection('portfolio');
  const portfolioRouter = createRouterPortfolio(portfolioCollection);
  app.use('/api/portfolio', portfolioRouter);
})
.catch(console.err);

app.use(parser.json());

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
