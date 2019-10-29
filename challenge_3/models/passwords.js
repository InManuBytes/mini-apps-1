const utils = require('../lib/hashUtils');
const Model = require('./model');

/**
 * Users is a class with methods to interact with the users table, which
 * stores information (id, hashed password, salt, userId) about users.
 * @constructor
 * @augments Model
 */
class Password extends Model {
  constructor() {
    super('passwords');
  }
  /**
   * Creates a new user record with the given username and password.
   * This method creates a salt and hashes the password before storing
   * the username, hashed password, and salt in the database.
   * @param {string} user.password - The plaintext password.
   * @returns {Promise<Object>} A promise that is fulfilled with the result of
   * the record creation or rejected with the error that occured.
   */
  create({ username, password }) {
    let salt = utils.createRandom32String();

    let newUser = {
      username,
      salt,
      password: utils.createHash(password, salt)
    };

    return super.create.call(this, newUser);
  }
}


module.exports = new Users();