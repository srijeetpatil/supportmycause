var User = require("../models/User");

var userExists = (req, res, next) => {
  let username = req.body.username;

  User.findOne({ username: username }, (err, result) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: "Internal server error" });
      return next(err);
    }
    if (!result) {
      return next();
    } else {
      res.statusCode = 400;
      res.json({
        error: "User already exists in the database with the same username",
      });
      return;
    }
  });
};

module.exports = userExists;
