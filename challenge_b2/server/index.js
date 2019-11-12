const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.post('/signup', (req, res) => {
  res.end('server received requet');
});

app.listen(port, () => console.log(`Battleship listening on port ${port}`));
