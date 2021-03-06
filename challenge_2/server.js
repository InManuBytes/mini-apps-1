var express = require("express");
var app = express();

// middleware and custom functions http://expressjs.com/en/resources/middleware.html
var fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
var converter = require("./utils/jasonToCSV");

// where to find our template files
app.set("views", "./client/views");
// which engine to render them with
app.set("view engine", "ejs");

app.listen(3000);

app.use(express.static("client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// now we will no longer use the index.html file but instead serve the get '/' request for the homepage
app.get("/", (req, res, next) => {
  res.render("index", {
    report: "Upload a file or enter JSON text to start",
    download: ""
  });
  next();
});

app.get("/csv", (req, res, next) => {
  var filepath = __dirname + "/reports/report.csv";
  console.log('filename', filepath);
  res.download(filepath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent report');
    }
    next();
  });
});

app.post("/json-text", (req, res, next) => {
  // because of the way we are sending our form through textarea
  // it will come in {jsontext: 'data'}, so we can access it with req.body.json
  var json = JSON.parse(req.body.jsontext);
  var CSV = { report: converter.jsonToCSV(json) };
  // http://expressjs.com/en/5x/api.html#res.render
  // res.render('view', localObject, callback)
  res.render("index", CSV);
  next();
});

app.post("/json-file", upload.single("jsonfile"), (req, res, next) => {
  // So the data is on req.file and it comes in 7bit encoding on a buffer
  var file = req.file;
  // We can use the node buf.toString([encoding[, start[, end]]])
  // ABOUT ENCODINGS: https://nodejs.org/docs/latest-v10.x/api/buffer.html#buffer_buffers_and_character_encodings
  // Experimental function: https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/decode
  var json = JSON.parse(file.buffer.toString("ascii"));
  var CSV = {
    report: converter.jsonToCSV(json),
    download: `<button id="download">Download</button>`
  };
  fs.writeFile("./reports/report.csv", CSV.report, "utf8", err => {
    if (err) throw err;
    console.log("CSV report file saved");
    // We can tell if it was sent with AJAX if we try
    next();
  });
  if (req.headers["x-requested-with"] === "XMLHttpRequest") {
    // we can send the data back and render on the client side
    res.send(CSV);
  } else {
    // or we can render it from a template
    res.render("index", CSV);
  }
  next();
});
