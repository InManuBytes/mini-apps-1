const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Battleship listening on port ${port}`));
