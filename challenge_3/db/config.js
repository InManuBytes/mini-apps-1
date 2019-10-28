const Promise = require('bluebird');

// TO DO - bring over from schema
module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create links table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255)
    );`)
    .then(() => {
      // Create addresses
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS addresses (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          line1 VARCHAR(255),
          line2 VARCHAR(255),
          city VARCHAR(255),
          state VARCHAR(64),
          zip VARCHAR(11),
          userId INT
        );`);
    })
    .then(() => {
      // Create clicks table
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS credit (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          number VARCHAR(30),
          expiry VARCHAR(10),
          cvv VARCHAR(3),
          billZip VARCHAR(11),
          userId INT
        );`);
    })
    .then(() => {
      // Create users table
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          password VARCHAR(64),
          salt VARCHAR(64),
          userID INT
        );`);
    })
    .error(err => {
      console.log(err);
    });
};