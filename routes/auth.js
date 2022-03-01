var express = require("express");
var router = express.Router();
// controllers
var signup = require("../controllers/signup");
var login = require("../controllers/login");
var getMyProfile = require("../controllers/getMyProfile");
// middleware
var userExists = require("../middleware/userExists");
// functions
var verifyJWT = require("../functions/verifyJWT");

router.post("/login", login);

router.post("/signup", userExists, signup);

router.get("/get-my-profile", verifyJWT, getMyProfile);

module.exports = router;
