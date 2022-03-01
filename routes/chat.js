var express = require("express");
var router = express.Router();
var verifyJWT = require("../functions/verifyJWT");
var initiateChat = require("../controllers/initiateChat");

router.post("/initiate", verifyJWT, initiateChat);

module.exports = router;
