var express = require('express');
var app = express();

// middleware
var bodyParser = require('body-parser');
// var ejs = require('ejs');

// where to find our template files
app.set('views', './client/views');
// when we set it here, we no longer need to require it above
app.set('view engine', 'ejs');

app.listen(3000);

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/json-text', (req, res, next) => {
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
  var json = JSON.parse(req.body.jsontext);
  var CSV = {report: jsonToCSV(json)};
  // http://expressjs.com/en/5x/api.html#res.render
  // res.render('view', localObject, callback)
  res.render('index', CSV);
  next();
});

// instead of using a template function, we'll use separate files in the views folder
// and serve them through get requests
// var template = ejs.compile(`
//   <div>
//     <div class="container">
//       <!-- form -->
//       <form action='json' method='post'>
//         <label for='json'>JSON FILE:</label>
//         <input id='json' type='text' name='json'>
//         <input type='submit' value='Convert'>
//       </form>
//       <!-- CSV REPORT -->
//       <div>
//         <h2>CSV Report</h2>
//         <pre>
//           <%= report %>
//         <pre>
//       </div>
//     </div>
//   </div>
// `)

// function that will take a json object and flattens to csv
var jsonToCSV = (json) => {
  var CSV = '';
  var keys = Object.keys(json);
  // since the last key will always be children, we can stop at the one right before
  var columnNames = keys.slice(0,keys.length - 1);
  for (let i = 0; i < columnNames.length; i++) {
    CSV += columnNames[i];
    if (i === columnNames.length - 1) {
      CSV += '\n';
    } else {
      CSV += ', ';
    }
  }
  // then we want to check the actual values of the json
  // we can use a helper function that takes in the columnNames/keys
  // and checks the json - deep
  var rows = jsonRows(json, columnNames).join('');
  CSV += rows;
  return CSV;
};

// we want to return the rows for each column/key in CSV format
var jsonRows = (jsonObj, columnNames, rows = []) => {
  row = '';
  for (let i = 0; i < columnNames.length; i++) {
    if (jsonObj[columnNames[i]] !== undefined) {
      row += jsonObj[columnNames[i]];
    }
    if (i === columnNames.length - 1) {
      row += '\n';
    } else {
      row += ', ';
    }
  }
  rows.push(row);
  if (jsonObj.children.length > 0 ) {
    jsonObj.children.forEach((child) => {
      return jsonRows(child, columnNames, rows);
    });
  }
  return rows;
};
