var jwt = require("jsonwebtoken");

// Add this to environment variables
var secret = process.env.PASSWORD_HASH;

function generateAccessToken(obj) {
  return jwt.sign({ obj }, secret, { expiresIn: 84600 });
}

module.exports = generateAccessToken;
