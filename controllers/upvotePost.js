var Request = require("../models/Request");
var User = require("../models/User");

var upvotePost = (req, res, next) => {
  let shortId = req.params.id;
  let { id } = req.body;

  if (id) {
    Request.updateOne(
      { shortId: shortId },
      { $inc: { upvotes: 1 } },
      { new: true },
      (err, result) => {
        if (err) {
          res.statusCode = 500;
          res.json({ error: "INS" });
          return next(err);
        }

        User.findByIdAndUpdate(id, { $inc: { karma: 1 } }, (error, docs) => {
          if (error) {
            res.statusCode = 500;
            res.json({ error: "INS" });
            return next(error);
          }

          res.json({ message: "Upvoted" });
        });
      }
    );
  } else {
    res.statusCode = 400;
    res.json({ error: "Add the user's id who created the post" });
  }
};

module.exports = upvotePost;