const utils = require('../lib/hashUtils');
const Model = require('./model');

/**
 * Users is a class with methods to interact with the users table, which
 * stores information (id, hashed password, salt, userId) about users.
 * @constructor
 * @augments Model
 */
class Accounts extends Model {
  constructor() {
    super('accounts');
  }
  /**
   * Creates a new account record with the given username and password.
   * This method creates a salt and hashes the password before storing
   * the account's name, email, hashed password, and salt in the database.
   * @param {Object} account - The account object.
   * @param {string} account.username - The user's username.
   * @param {string} account.password - The plaintext password.
   * @returns {Promise<Object>} A promise that is fulfilled with the result of
   * the record creation or rejected with the error that occured.
   */
  create({ name, email, password }) {
    let salt = utils.createRandom32String();

    let newUser = {
      name,
      email,
      salt,
      password: utils.createHash(password, salt)
    };

    return super.create.call(this, newUser);
  }
}


module.exports = new Accounts();