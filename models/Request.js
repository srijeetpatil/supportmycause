var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String },
  content: { type: String },
  files: [],
  type: { type: String, required: true },
  eth_address: String,
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  shortId: { type: String, required: true },
  verified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Request || mongoose.model("Request", requestSchema);
