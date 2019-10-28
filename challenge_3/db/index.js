var mysql = require('mysql');
const createTables = require('./config');
const Promise = require('bluebird');
const database = 'checkout';

var connection = mysql.createConnection({
  user: 'root',
  password: ''
});

// I was having trouble thinking about how to connect to the database
// Promises feel familiar, and are easy to work with,
// might be better to promisify the connection with the database
const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db));

module.exports = db;