var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(3000);

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/json', (req, res, next) => {
  // because of the way we are sending our form
  // it will come in {json: 'data'}
  // so we can access it with req.body.json
  // it will come in a string as:
  // {
  //   "firstName": "Joshie",
  //   "lastName": "Wyattson",
  //   "county": "San Mateo",
  //   "city": "San Mateo",
  //   "role": "Broker",
  //   "sales": 1000000,
  //   "children": []
  // }
  var json = JSON.parse(req.body.json);
  var CSV = jsonToCSV(json);
  console.log('CSV', CSV);
  res.redirect('/');
  next();
});

// function that will take a json object and flattens to csv
var jsonToCSV = (json) => {
  var CSV = '';
  var columns = Object.keys(json);
  // since the last key will always be children, we can stop at the one right before
  for (let i = 0; i < columns.length - 1; i++) {
    CSV += columns[i];
    if (i === columns.length - 2) {
      CSV += '\n';
    } else {
      CSV += ', ';
    }
  }
  return CSV;
}
