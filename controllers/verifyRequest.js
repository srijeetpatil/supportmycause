var Request = require("../models/Request");

var verify = async (req, res, next) => {
  try {
    // request shortid
    let id = req.params.id;
    let { value } = req.body;
    await Request.find(
      { shortid: id },
      { $set: { verified: value } },
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
  } catch (err) {
    console.error(err);
  }
};

module.exports = verify;
