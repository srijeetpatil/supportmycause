var jwt = require("jsonwebtoken");

// Add this to environment variables
var secret = "bnjng2u4unijng8";

function generateAccessToken(obj) {
  return jwt.sign({ obj }, secret, { expiresIn: 84600 });
}

module.exports = generateAccessToken;
