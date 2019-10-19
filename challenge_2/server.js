var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(3000);

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/json', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
  next();
});
