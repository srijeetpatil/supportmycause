var jwt_decode = require("jwt-decode");

var extractUserFromJwt = (req) => {
  let bearerToken = req.headers.authorization;
  let token = bearerToken.split("Bearer ")[1];
  var decoded = jwt_decode(token);
  return decoded;
};

module.exports = extractUserFromJwt;