const crypto = require('crypto');

/************************************************************/
// Add any hashing utility functions below
/************************************************************/

/** @module hashUtils */

/**
 * Creates a hash using the sha256 algorithm. The salt is optional.
 * @param {string} data - The data to hash.
 * @param {string} [salt] - The salt to add to the data before hashing.
 * @returns {string} A string with the hashed value.
 */

exports.createHash = (data, salt = '') => {
  let shasum = crypto.createHash('sha256');
  shasum.update(data + salt);
  return shasum.digest('hex');
};

/**
 * Creates a random 32 byte string.
 * @returns {string} A random string.
 */
exports.createRandom32String = () => {
  return crypto.randomBytes(32).toString('hex');
};
