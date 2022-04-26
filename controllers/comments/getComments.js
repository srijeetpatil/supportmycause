var Comment = require("../../models/Comment");

var getComments = async (req, res, next) => {
  var postId = req.params.id;
  try {
    let comments = await Comment.find({ postId: postId }).populate(
      "author",
      "username picture",      
    );

    res.json({ comments: comments });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "INS" });
    return next(err);
  }
};

module.exports = getComments;
