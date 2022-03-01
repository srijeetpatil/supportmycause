var User = require("../models/User");
var extractUserFromJwt = require("../functions/extract");

var initiateChat = (req, res, next) => {
  let data = extractUserFromJwt(req);
  let { _id } = data.obj;

  let { reciever, message } = req.body;

  let messageBody = {
    sender: _id,
    reciever: reciever,
    status: "Pending",
    content: message,
  };

  User.update(
    { _id: { $in: [_id, reciever] } },
    { $push: { chat: messageBody } },
    { multi: true },
    (err, result) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: err });
        return next(err);
      }
      res.json({ message: "Success" });
    }
  );
};

module.exports = initiateChat;
