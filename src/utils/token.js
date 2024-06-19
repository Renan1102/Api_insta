const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const decryptedToken = async(authHeader) =>{
// Bearer dsfdssfsdfsdfdsfd
  const [,token] = authHeader.split(' '); // suprimindo a primeira parte

  return promisify(jwt.verify)(token, process.env.HASH_BCRYPT);

};

module.exports = { decryptedToken };