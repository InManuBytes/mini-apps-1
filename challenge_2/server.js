var express = require('express');
var app = express();

// middleware and custom functions
// http://expressjs.com/en/resources/middleware.html
var bodyParser = require('body-parser');
// we exported outour jasonToCSV function and moved it to a new folder
// so if we also write other functions that we might need we can put them there
var converter = require('./utils/jasonToCSV');

// where to find our template files
app.set('views', './client/views');
// when we set it here, we no longer need to require it above
app.set('view engine', 'ejs');

app.listen(3000);

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/json-text', (req, res, next) => {
  // because of the way we are sending our form through textarea
  // it will come in {jsontext: 'data'}
  // so we can access it with req.body.json
  var json = JSON.parse(req.body.jsontext);
  var CSV = {report: converter.jsonToCSV(json)};
  // http://expressjs.com/en/5x/api.html#res.render
  // res.render('view', localObject, callback)
  res.render('index', CSV);
  next();
});
