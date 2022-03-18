var express = require("express");
var router = express.Router();
var verifyJWT = require("../functions/verifyJWT");
// controllers
var create = require("../controllers/request/create");
var getRequestById = require("../controllers/request/getRequest");
var getAllRequests = require("../controllers/request/getAllRequests");
var upvotePost = require("../controllers/request/upvotePost");
var downvotePost = require("../controllers/request/downvotePost");

// Creates a new request and assigns a unique shortId to it
// Only authorized users can create a request
router.post("/create", verifyJWT, create);

router.get("/:id", getRequestById);

router.get("/", getAllRequests);

// Upvote a post
router.post("/upvote/:id", verifyJWT, upvotePost);
// Downvote a post
router.post("/downvote/:id", verifyJWT, downvotePost);

module.exports = router;
