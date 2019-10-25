const express = require('express');
const app = express();
const port = 3000;

// middleware
//const cors = require('cors')

// we want to serve our JS files in the public folder,
// where Babel is placing the transpiled files.
app.use(express.static(__dirname + '/public'));
//app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

