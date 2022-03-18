var User = require("../../models/User");

var verify = async (req, res, next) => {
  try {
    let { value, id } = req.body;
    await User.findByIdAndUpdate(
      id,
      { $set: { verified: value } },
      { new: true }
    );
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.statusCode = 500;    
    res.json({ error: "Internal server error" });
    return next(err);
  }
};

module.exports = verify;
