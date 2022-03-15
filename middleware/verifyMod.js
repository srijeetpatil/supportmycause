var User = require("../models/User");
var extractUserFromJwt = require("../functions/extract");

var verifyMod = (req, res, next) => {
  let data = extractUserFromJwt(req);
  let id = data.obj._id;

  User.findById(id, (err, result) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: "Internal server error" });
      return next(err);
    } else if (result) {
      let type = result.type;
      if (type === "Admin") {
        return next();
      } else {
        res.statusCode = 400;
        res.json({ error: "Unauthorized" });
      }
    } else {
      res.statusCode = 400;
      res.json({ error: "Unauthorized" });
    }
  });
};

module.exports = verifyMod;
