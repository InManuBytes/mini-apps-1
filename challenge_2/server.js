var express = require('express');
var app = express();

app.listen(3000);

app.use(express.static('client'));

app.post('/json', (req, res, next) => {
  console.log(req.body);
  next();
});
