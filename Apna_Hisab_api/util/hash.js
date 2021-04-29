var Hashing = require('./encryptor');

/**
 * [pHashPassword description]
 * @param  {[type]}   pwdString [description]
 * @param  {[type]}   salt      [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
module.exports.hashPassword = (password, salt) => {
    var hashoptions, hasher;
    hashoptions = {
        DEFAULT_HASH_ITERATIONS: 1000,
        SALT_SIZE: 32,
        KEY_SIZE: 32
    }
    hasher = new Hashing(hashoptions);
    salt = salt || hasher.generateSalt();
    return new Promise(function(resolve , reject){

       hasher.secureHash(password, salt, function(err, hash, salt) {
            if (err) {
                return reject(err);
            } else {
                console.log(hash,salt);
                return resolve({p:hash , s:salt});
            }
        });
    });
}