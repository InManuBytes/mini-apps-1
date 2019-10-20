// function that will take a json object and flattens to csv
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
var jsonToCSV = json => {
  var CSV = "";
  var keys = Object.keys(json);
  // since the last key will always be children, we can stop at the one right before
  var columnNames = keys.slice(0, keys.length - 1);
  for (let i = 0; i < columnNames.length; i++) {
    CSV += columnNames[i];
    if (i === columnNames.length - 1) {
      CSV += "\n";
    } else {
      CSV += ", ";
    }
  }
  // then we want to check the actual values of the json
  // we can use a helper function that takes in the columnNames/keys
  // and checks the json - deep
  var rows = jsonRows(json, columnNames).join("");
  CSV += rows;
  return CSV;
};

// we want to return the rows for each column/key in CSV format
var jsonRows = (jsonObj, columnNames, rows = []) => {
  row = "";
  for (let i = 0; i < columnNames.length; i++) {
    if (jsonObj[columnNames[i]] !== undefined) {
      row += jsonObj[columnNames[i]];
    }
    if (i === columnNames.length - 1) {
      row += "\n";
    } else {
      row += ", ";
    }
  }
  rows.push(row);
  if (jsonObj.children.length > 0) {
    jsonObj.children.forEach(child => {
      return jsonRows(child, columnNames, rows);
    });
  }
  return rows;
};

module.exports.jsonToCSV = jsonToCSV;