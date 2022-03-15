var User = require("../models/User");

var getAllUsers = async (req, res, next) => {
  try {
    let query = User.find({}).select(
      "username karma type verified verificationFile picture"
    );

    query.exec((err, users) => {
      res.send(users);
    });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "INS" });
    return next(err);
  }
};

module.exports = getAllUsers;
