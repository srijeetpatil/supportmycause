var express = require("express");
var router = express.Router();
// controllers
var signup = require("../controllers/auth/signup");
var login = require("../controllers/auth/login");
var getMyProfile = require("../controllers/auth/getMyProfile");
var addVerificationFile = require("../controllers/auth/addVerificationFile");
var addProfilePicture = require("../controllers/auth/addProfilePicture");
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
