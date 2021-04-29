'use strict';
var jws = require('jws');
var algo = 'HS256';
const commonKey = process.env.COMMON_JWT;
const expiresIn = process.env.COMMON_JWT_EXP_TIME;
//jwt.jwtsign({ email: email }, { expiresInMinutes: 60 });

module.exports = {
    jwtsign : function(payload,  options, secretOrPrivateKey = commonKey){
		options = options || {};
		var header = {
			alg: options.algorithm || algo
		};
		payload.iat = Math.round(Date.now() / 1000);   //iat= identified token time issue
		if (options.expiresInMinutes) {
			var ms = options.expiresInMinutes * 60;
			payload.exp = payload.iat + ms;
		}

		if (options.issuer)     //reason to be made
			payload.iss = options.issuer;

		if (options.subject)     
			payload.sub = options.subject;

		var signed = jws.sign({
		    header: header,
		    payload: payload,
		    secret: secretOrPrivateKey
		});
		return signed;
	},
	jwtverify : function(token,secretOrPrivateKey = commonKey){
		let decoded;
		try{
			decoded = jws.verify(token,algo, secretOrPrivateKey);
		}
		catch(e){
			return Promise.reject(e)
		}
		return decoded;
	},
	jwtdecode : async function(token, secretOrPrivateKey = commonKey){
		let decoded;
		try{
			decoded = jws.decode(token);
		}
		catch(e){
			return Promise.reject(e)
		}
		return JSON.parse(decoded.payload).email;
	} 
	
}