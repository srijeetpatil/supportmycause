var Comment = require("../models/Comment");
var extractUserFromJwt = require("../functions/extract");

var postComment = (req, res, next) => {
  let data = extractUserFromJwt(req);
  let id = data.obj._id;
  let postId = req.params.id;

  let { content } = req.body;

  if (id && content) {
    let newComment = new Comment({
      author: id,
      content: content,
      postId: postId,
    });

    newComment.save((err, result) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: "Internal server error" });
        return next(err);
      } else {
        res.statusCode = 200;
        res.json({ message: "Successfully created a new comment" });
      }
    });
  } else {
    res.statusCode = 400;
    res.json({ error: "Please provide complete details" });
  }
};

module.exports = postComment;
