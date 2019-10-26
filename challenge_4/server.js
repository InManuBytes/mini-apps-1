const express = require('express');
const app = express();
const port = 8080;

app.use(express.static(__dirname + '/client/dist'));

app.listen(port, () => console.log(`Connectfour listening on port ${port}!`));