var User = require("../models/User");

var verify = async (req, res, next) => {
  try {
    let { value, id } = req.body;
    await User.findByIdAndUpdate(
      id,
      { $set: { verified: value } },
      { new: true },
      (err, docs) => {
        if (err) {
          res.statusCode = 500;
          res.json({ error: "Internal server error" });
          return next(err);
        } else {
          res.statusCode = 200;
          res.json({ message: "Success" });
        }
      }
    );
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Internal server error" });
    return next(err);
  }
};

module.exports = verify;
