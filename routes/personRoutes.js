const express = require("express");
const router = express.Router();
const { createPerson } = require("../controllers/personController");

router.post("/", createPerson);

module.exports = router;
