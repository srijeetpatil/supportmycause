var express = require("express");
var router = express.Router();
var verifyJWT = require("../functions/verifyJWT");
// controllers
var create = require("../controllers/create");
var getRequestById = require("../controllers/getRequest");
var getAllRequests = require("../controllers/getAllRequests");

// Creates a new request and assigns a unique shortId to it
// Only authorized users can create a request
router.post("/create", verifyJWT, create);

router.get("/:id", getRequestById);

router.get("/", getAllRequests);

module.exports = router;
