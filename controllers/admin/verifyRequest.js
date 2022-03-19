var Request = require("../../models/Request");

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
    res.statusCode = 500;
    res.json({ error: "INS" });
  }
};

module.exports = verify;
