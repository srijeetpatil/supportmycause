var Request = require("../models/Request");

var verify = (req, res, next) => {
  // request shortid
  let id = req.params.id;
  await Request.find(
    { shortid: id },
    { $set: { verified: true } },
    { new: true },
    (err, docs) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: "Internal server error" });
      } else {
        res.statusCode = 200;
        res.json({ message: "Success" });
      }
    }
  );
};

module.exports = verify;
