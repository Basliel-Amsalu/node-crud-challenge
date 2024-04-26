const express = require("express");
const router = express.Router();
const {
  createPerson,
  getAllPersons,
  getPersonById,
} = require("../controllers/personController");

router.route("/").get(getAllPersons).post(createPerson);
router.route("/:id").get(getPersonById);

module.exports = router;
