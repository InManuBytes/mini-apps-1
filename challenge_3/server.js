const express = require('express');
const app = express();
// const router = require('./routes.js');
const models = require('./models');
const utils = require('./lib/hashUtils');


const port = 3000;

// middleware
//const cors = require('cors')
var bodyParser = require("body-parser");

// we want to serve our JS files in the public folder,
// where Babel is placing the transpiled files.
app.use(express.static(__dirname + '/public'));
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// the routes we have to serve are
app.post('/submit', (req, res, next) => {
  console.log('REQ: ', req.body);
  // first check if user already has an account created
  var step = req.body.step;
  var formData = JSON.parse(req.body.form);
  if (step === 'createAccount') {
    return models.Accounts.get({name: formData.name, email: formData.email})
      .then((existingAccount) => {
        console.log('LOOKING IN DATABASE FOR: ', existingAccount);
        if (existingAccount) {
          throw new Error('Account already exists');
        } else {
          return formData;
        }
      })
      .then(newAccount => {
        console.log('CREATING NEW ACCOUNT FOR: ', newAccount);
        return models.Accounts.create(newAccount);
      })
      .then(savedAccount => {
        console.log('SAVED ACCOUNT WITH USER ID: ', savedAccount.insertId);
        var account = {userId: savedAccount.insertId};
        var accountString = JSON.stringify(account);
        res.status(201).end(accountString);
        next();
      })
      .catch(error => {
        console.log(error);
      });
  } else if (step === 'address' || step === 'creditCard') {
    var record = {
      ...formData,
      userId: req.body.userId
    }
    var saveRecord;
    if (step === 'address') {
      saveRecord = models.Adresses;
    } else {
      saveRecord = models.Cards;
    }
    console.log('RECORD TO ADD: ', record);
    return saveRecord.create(record)
      .then(savedRecord => {
        if (savedRecord) {
          var user = {userId: record.userId};
          var userString = JSON.stringify(user);
          res.status(201).end(userString);
        } else {
          res.status(405).end();
        }
        next();
      })
      .catch(error => {
        console.log(error);
      });
  }
});

app.get('/getSummary', (req, res, next) => {
  console.log('SUMMARY', req.query);
  res.end('REQUEST AT SERVER');
  next();
});

app.listen(port, () => console.log(`Checkout app listening on port ${port}!`));

