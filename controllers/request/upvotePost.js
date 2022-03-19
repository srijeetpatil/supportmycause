var Request = require("../../models/Request");
var User = require("../../models/User");
var extractUserFromJwt = require("../../functions/extract");

var upvotePost = async (req, res, next) => {
  try {
    let shortId = req.params.id;
    let data = extractUserFromJwt(req);
    let userId = data.obj._id;

    let request = await Request.findOne({ shortId: shortId });
    let { upvotes, downvotes, created_by } = request;
    let user = await User.findById(created_by);

    if (upvotes.indexOf(userId) !== -1) {
      // Remove upvote and return
      let index = upvotes.indexOf(userId);
      upvotes.splice(index, 1);
      request.upvotes = upvotes;
      await request.save();

      if (userId != created_by) {
        user.karma = user.karma - 1;
        await user.save();
      }
      res.json({ message: "Removed upvote" });
      return;
    } else if (downvotes.indexOf(userId) !== -1) {
      // Remove downvote
      let index = downvotes.indexOf(userId);
      downvotes.splice(index, 1);
      request.downvotes = downvotes;

      if (userId != created_by) user.karma = user.karma + 1;
    }

    // General case where a user is either upvoting first time or
    // is upvoting after downvoting
    upvotes.push(userId);
    request.upvotes = upvotes;
    await request.save();

    if (userId != created_by) {
      user.karma = user.karma + 1;
      await user.save();
    }

    res.json({ message: "Upvoted" });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Internal server error" });
  }
};

module.exports = upvotePost;
