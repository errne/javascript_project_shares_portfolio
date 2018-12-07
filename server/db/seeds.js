use shares_portfolio;
db.dropDatabase();

db.stocks;

db.portfolio.insertMany([
  {
    "companyName": "Ekso Bionics Holdings Inc.",
    "symbol": "EKSO",
    "amount": 5
  },
  {
    "companyName": "ESSA Pharma Inc.",
    "symbol": "EPIX",
    "amount": 5
  },
  {
    "companyName": "Acceleron Pharma Inc.",
    "symbol": "XLRN",
    "amount": 25
  },
  {
    "companyName": "Hanger Inc.",
    "symbol": "HNGR",
    "amount": 33
  },
  {
    "companyName": "Daxor Corporation",
    "symbol": "DXR",
    "amount": 21
  }
]);
