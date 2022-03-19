var Request = require("../../models/Request");

var getRequestById = (req, res, next) => {
  try {
    let shortId = req.params.id;

    Request.findOne({ shortId: shortId })
      .populate("created_by", "username karma")
      .exec((err, result) => {
        if (err) {
          res.statusCode = 500;
          res.json({ error: "Internal server error" });
          return next(err);
        } else if (result) {
          res.statusCode = 200;
          res.json(result);
        } else {
          res.statusCode = 404;
          res.json({ error: "Not found" });
        }
      });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Internal server error" });
  }
};

module.exports = getRequestById;
