var User = require("../models/User");
var bcrypt = require("bcrypt");
var saltRounds = 10;
var generateAccessToken = require("../functions/generate");

var signup = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    bcrypt.hash(password, saltRounds, (error, hash) => {
      // Error in creating password hash
      if (error) {
        res.statusCode = 500;
        res.json({ error: "Internal server error" });
        return next(err);
      }

      let newUser = new User({
        username: username,
        password: hash,
        karma: 0,
        eth_address: [],
      });

      newUser.save((err, docs) => {
        if (err) {
          res.statusCode = 500;
          res.json({ error: "Internal server error" });
          return next(err);
        } else {
          let jwt = generateAccessToken(docs);
          res.statusCode = 200;
          res.json({ token: jwt });
        }
      });
    });
  } else {
    res.statusCode = 400;
    res.json({ error: "Please provide the complete details" });
  }
};

module.exports = signup;
