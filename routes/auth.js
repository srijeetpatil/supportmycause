var express = require("express");
var router = express.Router();
// controllers
var signup = require("../controllers/signup");
var login = require("../controllers/login");
var getMyProfile = require("../controllers/getMyProfile");
var addVerificationFile = require("../controllers/addVerificationFile");
var addProfilePicture = require("../controllers/addProfilePicture");
// middleware
var userExists = require("../middleware/userExists");
// functions
var verifyJWT = require("../functions/verifyJWT");

router.post("/login", login);

router.post("/signup", userExists, signup);

// Profile related routes
router.get("/get-my-profile", verifyJWT, getMyProfile);

router.post("/add-verification-file", verifyJWT, addVerificationFile);

router.post("/add-profile-picture", verifyJWT, addProfilePicture);

module.exports = router;
