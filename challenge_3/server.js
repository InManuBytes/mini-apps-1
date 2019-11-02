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

// app.use('/classes', router);

//app.get('/', (req, res) => res.send('Hello World!'));

// the routes we have to serve are
app.post('/submit', (req, res, next) => {
  console.log('REQ: ', req.body);
  //models.account.post(req.form, )
  next();
});

app.listen(port, () => console.log(`Checkout app listening on port ${port}!`));

