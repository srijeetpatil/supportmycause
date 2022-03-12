var User = require("../models/User");
var extractUserFromJwt = require("../functions/extract");

var addProfilePicture = (req, res, next) => {
  var { url } = req.body;
  let data = extractUserFromJwt(req);
  let id = data.obj._id;

  User.findByIdAndUpdate(id, { $set: { picture: url } }, (err, docs) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: "INS" });
      return next(err);
    }

    res.json({ message: "Success" });
  });
};

module.exports = addProfilePicture;
