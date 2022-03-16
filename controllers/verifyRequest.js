var Request = require("../models/Request");

var verify = async (req, res, next) => {
  try {
    // request shortid
    let id = req.params.id;
    let { value } = req.body;
    await Request.findOneAndUpdate(
      { shortId: id },
      { verified: value },
      { new: true }
    );
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = verify;
