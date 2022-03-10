var express = require("express");
var router = express.Router();
var verifyJWT = require("../functions/verifyJWT");
// controllers
var postComment = require("../controllers/postComment");
var getComments = require("../controllers/getComments");

// Get comments on a request by providing postId
router.get("/all/:id", getComments);

// Post a comment to a request/post
router.post("/post/:id", verifyJWT, postComment);

module.exports = router;
