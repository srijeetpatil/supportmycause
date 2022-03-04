var express = require("express");
var router = express.Router();
var verifyJWT = require("../functions/verifyJWT");
// controllers
var create = require("../controllers/create");
var getRequestById = require("../controllers/getRequest");
var getAllRequests = require("../controllers/getAllRequests");
var upvotePost = require("../controllers/upvotePost");

// Creates a new request and assigns a unique shortId to it
// Only authorized users can create a request
router.post("/create", verifyJWT, create);

router.get("/:id", getRequestById);

router.get("/", getAllRequests);

// Upvote a post
router.post("/upvote/:id", verifyJWT, upvotePost);

module.exports = router;
