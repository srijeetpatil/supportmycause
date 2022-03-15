var express = require("express");
var router = express.Router();
var verifyJWT = require("../functions/verifyJWT");
var verifyMod = require("../middleware/verifyMod");
// controllers
var verify = require("../controllers/verifyRequest");
var getAllUsers = require("../controllers/getAllUsers");
var verifyUser = require("../controllers/verifyUser");

// Get all users
router.get("/users/", verifyJWT, verifyMod, getAllUsers);

router.post("/users/verify", verifyJWT, verifyMod, verifyUser);

// Verify a request
router.post("/verify/:id", verifyJWT, verifyMod, verify);

module.exports = router;
