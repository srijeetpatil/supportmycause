var User = require("../../models/User");
const generateAccessToken = require("../../functions/generate");
var bcrypt = require("bcrypt");

var login = (req, res, next) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          res.statusCode = 500;
          res.json({ error: "Internal server error" });
          return next(err);
        }
        if (!user) {
          res.statusCode = 400;
          res.json({ error: "User not found" });
        } else {
          let hash = user.password;

          bcrypt.compare(password, hash, function (err, docs) {
            if (docs) {
              // Generate a jwt upon login
              let jwt = generateAccessToken(user);

              res.statusCode = 200;
              res.json({ token: jwt });
            } else if (err) {
              res.statusCode = 400;
              res.json({ error: "Invalid password" });
            }
          });
        }
      });
    } else {
      res.statusCode = 400;
      res.json({ error: "Please provide the complete details" });
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Internal server error" });
  }
};

module.exports = login;
