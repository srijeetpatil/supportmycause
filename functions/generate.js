var jwt = require("jsonwebtoken");

var secret = process.env.PASSWORD_HASH;

function generateAccessToken(obj) {
  return jwt.sign({ obj }, secret, { expiresIn: 84600 });
}

module.exports = generateAccessToken;
