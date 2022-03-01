var express = require("express");
var router = express.Router();
var verifyJWT = require("../functions/verifyJWT");
var verifyMod = require("../middleware/verifyMod");
// controllers
var verify = require("../controllers/verifyRequest");

// Only a moderator or a highly reputed user can verify a request.
router.post("/verify/:id", verifyJWT, verifyMod, verify);
