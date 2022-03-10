var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  eth_address: [],
  karma: Number,
  type: { type: String, default: "Normal" },
  chat: [
    {
      sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
      reciever: { type: Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, default: "Pending" },
      content: String,
      created_at: { type: Date, default: Date.now },
      _id: false,
    },
  ],
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
