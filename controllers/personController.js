const uuid = require("uuid");
const personSchema = require("../models/personModel");
const persons = require("../db/db");

exports.createPerson = (req, res) => {
  try {
    const { error } = personSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    } else {
      const id = uuid.v4();
      const newPerson = { id, ...req.body };
      persons.push(newPerson);
      res.status(201).json({
        message: "successfully created",
      });
    }
  } catch {
    res
      .status(500)
      .json({ error: "An error occurred while creating the person" });
  }
};
