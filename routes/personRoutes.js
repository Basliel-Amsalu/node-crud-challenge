const express = require("express");
const router = express.Router();
const {
  createPerson,
  getAllPersons,
  getPersonById,
  updatePerson,
  deletePerson,
} = require("../controllers/personController");

router.route("/").get(getAllPersons).post(createPerson);
router.route("/:id").get(getPersonById).put(updatePerson).delete(deletePerson);

module.exports = router;
