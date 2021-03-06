var Request = require("../../models/Request");
var User = require("../../models/User");
var extractUserFromJwt = require("../../functions/extract");

var downvotePost = async (req, res, next) => {
  try {
    let shortId = req.params.id;
    let data = extractUserFromJwt(req);
    let userId = data.obj._id;

    let request = await Request.findOne({ shortId: shortId });
    let { upvotes, downvotes, created_by } = request;
    let user = await User.findById(created_by);

    if (upvotes.indexOf(userId) !== -1) {
      // Remove upvote
      let index = upvotes.indexOf(userId);
      upvotes.splice(index, 1);
      request.upvotes = upvotes;

      if (userId != created_by) user.karma = user.karma - 1;
    } else if (downvotes.indexOf(userId) !== -1) {
      // Remove downvote and return
      let index = downvotes.indexOf(userId);
      downvotes.splice(index, 1);
      request.downvotes = downvotes;
      await request.save();

      if (userId != created_by) {
        user.karma = user.karma + 1;
        await user.save();
      }
      res.json({ message: "Removed downvote" });
      return;
    }

    // General case where a user is either downvoting first time or
    // is downvoting after upvoting
    downvotes.push(userId);
    request.downvotes = downvotes;
    await request.save();

    if (userId != created_by) {
      user.karma = user.karma - 1;
      await user.save();
    }
    res.json({ message: "Downvoted" });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "500 internal server error, try again" });
  }
};

module.exports = downvotePost;
