var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  created_at: { type: Date, default: Date.now },
  postId: { type: Schema.Types.ObjectId, ref: "Request" },
  votes: 0,  
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
