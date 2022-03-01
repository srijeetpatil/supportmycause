var express = require("express");
var router = express.Router();
var verifyJWT = require("../functions/verifyJWT");
// controllers
var postComment = require("../controllers/postComment");

// Get comments on a request by providing postId
router.get("/");

// Post a comment to a request/post
router.post("/post", verifyJWT, postComment);

router.post("/reply");