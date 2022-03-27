var User = require("../../models/User");
var extractUserFromJwt = require("../../functions/extract");

var getMyProfile = (req, res) => {
  try {
    let data = extractUserFromJwt(req);
    let id = data.obj._id;

    User.findById(id)
      .populate("chat.sender chat.reciever")
      .exec((err, userData) => {
        if (err) {
          res.statusCode = 500;
          console.log(err);
          res.json({ error: "INS error" });
          return;
        } else {
          let {
            username,
            eth_address,
            karma,
            type,
            chat,
            _id,
            verified,
            picture,
            verificationFile,
          } = userData;
          res.json({
            username,
            eth_address,
            karma,
            type,
            chat,
            id: _id,
            verified,
            picture,
            verificationFile,
          });
        }
      });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "INS error" });
  }
};

module.exports = getMyProfile;
