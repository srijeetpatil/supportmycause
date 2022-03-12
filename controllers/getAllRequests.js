var Request = require("../models/Request");

var getAllRequests = (req, res, next) => {
  Request.find()
    .populate("created_by", "username karma picture")
    .exec((err, result) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: "Internal server error" });
        return next(err);
      } else {
        res.statusCode = 200;
        res.json(result);
      }
    });
};

module.exports = getAllRequests;
