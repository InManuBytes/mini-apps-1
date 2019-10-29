var mysql = require('mysql');
const createTables = require('./config');
const Promise = require('bluebird');
const database = 'checkout';

var connection = mysql.createConnection({
  user: 'root',
  password: ''
});

// First, I though of connecting to the database directly
// hence the schema.sql. But I wanted to be able to
// hash the password like in shortly.
// I was having trouble thinking about how to connect to the database
// without something like sequelize or a controller + model
// to deal with the callbacks.
// Promises feel familiar, and are easy to work with, looking through
// the shortly code I found how it promisifies mysql.
// Here just trying to understand it from the documentation
// and the online article: https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
//
// The first step is to promisify the connection we can use:
// Promise.psomisifyAll, which, according to the documentation,
// "Promisifies the entire object by going through the object's properties
// and creating an async equivalent of each function on the object
// and its prototype chain.
// The promisified method name will be the original method name
// suffixed with suffix (default is "Async")."
const db = Promise.promisifyAll(connection, { multiArgs: true });
/**
 *  Option: multiArgs
 *  Setting multiArgs to true means the resulting promise will always fulfill with:
 *  an array of the callback's success value(s).
 *  This is needed because promises only support a single success value,
 *  while some callback API's have multiple success value.
 *  The default is to ignore all but the first success value of a callback function.
 *  we want to use this option because as we are familiar with msqyl, we might use
 *  SELECT statements to return an array with multiple results
 */


// so now where before we had connection.connect();
// we'll call the async version of it:
db.connectAsync()
  // and the nice thing is that then we can track where we are in the call
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  // and instead of having the .sql file, we'll put the first two statements here
  // with a modified CREATE DATABASE statement
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  // then call our config file, which specifies the tables to create
  .then(() => createTables(db));

module.exports = db;