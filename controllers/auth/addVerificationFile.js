var User = require("../../models/User");
var extractUserFromJwt = require("../../functions/extract");

var addVerificationFile = (req, res, next) => {
  try {
    var { url } = req.body;
    let data = extractUserFromJwt(req);
    let id = data.obj._id;

    User.findByIdAndUpdate(
      id,
      { $set: { verificationFile: url } },
      (err, docs) => {
        if (err) {
          res.statusCode = 500;
          res.json({ error: "INS" });
          return next(err);
        }

        res.json({ message: "Success" });
      }
    );
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "INS" });
  }
};

module.exports = addVerificationFile;
