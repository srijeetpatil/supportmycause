var express = require("express");
var router = express.Router();
var verifyJWT = require("../functions/verifyJWT");
var initiateChat = require("../controllers/chat/initiateChat");

router.post("/initiate", verifyJWT, initiateChat);

module.exports = router;
