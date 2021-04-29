var crypto = require("crypto"),
    Encryptor;

Encryptor = module.exports = function(options) {
    var key;
    if (!(this instanceof Encryptor)) {
        return new Encryptor(options);
    }

    //iterate configuration object 
    for (key in options) {
        if (options.hasOwnProperty(key)) {
            this[key] = options[key];
            //console.log('key:' + key + ' value:' + options[key]);
        }
    }
};

function isFunction(value) {
    return typeof value === 'function';
}

function binaryToBase64(binary) {
    return new Buffer(binary, "binary").toString("base64");
}


Encryptor.prototype = {
    /**
     *  Function: random number generation
     *  @param bytes 
     *          length of randon number
     *  @param {Function=} callback
     *  Returns generated random number
     */
    "random": function(bytes, callback) {
        if (isFunction(callback)) {
            crypto.randomBytes(bytes, function(err, buffer) {
                if (err) {
                    console.log("ERROR in random number generation", err);
                }
                callback.call(this, buffer);
            });
        } else {
            try {
                var buffer = crypto.randomBytes(bytes);
                return buffer;
            } catch (err) {
                return null;
            }
        }
        return null;
    },

    /**
     * Convenience wrapper around .random to grab a new salt value.
     * Treat this value as opaque, as it captures iterations.
     *
     * @param {Number=} explicitIterations An integer (optional)
     * @param {Function=} callback (optional)
     * Return iterations and salt together as one string ({hex-iterations}.{base64-salt}) (optional)
     */
    "generateSalt": function(explicitIterations, callback) {
        var defaultHashIterations = this.DEFAULT_HASH_ITERATIONS,
            saltSize = this.SALT_SIZE,
            explicitIterationsInt, iterations, bytes;

        if (!callback && isFunction(explicitIterations)) {
            callback = explicitIterations;
            explicitIterations = null;
        }

        if (explicitIterations) {
            // make sure explicitIterations is an integer
            //console.log(explicitIterations);
            explicitIterationsInt = parseInt(explicitIterations, 10);
            if (explicitIterationsInt !== explicitIterations || isNaN(explicitIterationsInt)) {
                //console.log(explicitIterationsInt);
                throw new Error("explicitIterations must be an integer");
            }
            explicitIterations = explicitIterationsInt;
            // and that it is not smaller than our default hash iterations
            if (explicitIterations < defaultHashIterations) {
                throw new Error("explicitIterations cannot be less than " + defaultHashIterations);
            }
        }

        // convert iterations to Hexadecimal
        iterations = (explicitIterations || defaultHashIterations).toString(16);

        function concat(bytes) {
            // concat the iterations and random bytes together.
            var base64 = binaryToBase64(bytes);
            return iterations + "." + base64;
        }

        // get some random bytes
        if (isFunction(callback)) {
            this.random(saltSize, function(bytes) {
                callback(concat(bytes));
            });
        } else {
            bytes = this.random(saltSize);
            return concat(bytes);
        }

    },

    /**
     * Uses PBKDF2 internally, as implemented by the node's native crypto library.
     *
     * If the salt param is ommitted, generates salt automatically
     *
     * Asynchronous
     *
     * @param {String} value MUST be a string. (password string in plain text)
     * @param {String} salt (should include iterations). (optional)
     * @param {Function} callback fn( err, {String} A secure hash (base64 encoded), salt w/ iterations )
     */
    "secureHash": function(value, salt, callback) {
        var keySize = this.KEY_SIZE,
            i, iterations;
        // if salt was not supplied, generate it now.
        if (isFunction(salt) || salt === null) {
            callback = callback || salt;
            salt = this.generateSalt();
        }
        if (!isFunction(callback)) {
            throw new Error("callback is required (as Function)");
        }
        if (!value || typeof value !== "string") {
            callback(new Error("value is required (as String)"));
            return;
        }
        console.log('salt...' + salt);

        i = (salt).indexOf(".");
        iterations = parseInt(salt.substring(0, i), 16);
        //console.log('i...' + i);
        //console.log('iterations..' + iterations);
        //console.log('value..' + value);
        //console.log('keysize..' + keySize);
        crypto.pbkdf2(value, salt.substring(i + 1), iterations, keySize, "sha256",function(err, derivedKey) {
            var base64;
            if (!err) {
                console.log('key ' + derivedKey);
                base64 = binaryToBase64(derivedKey);
            }
            callback(err, base64, salt);
        });
    }


};

Encryptor.Encryptor = Encryptor;