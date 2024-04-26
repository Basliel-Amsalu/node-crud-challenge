const uuid = require("uuid");
const personSchema = require("../models/personModel");
const persons = require("../db/db");
const {
  handleValidationError,
  handleNotFoundError,
} = require("../utils/errorHandler");

exports.createPerson = (req, res) => {
  try {
    const { error } = personSchema.validate(req.body);
    if (error) {
      handleValidationError(error.details[0].message);
    } else {
      const id = uuid.v4();
      const newPerson = { id, ...req.body };
      persons.push(newPerson);
      res.status(200).json({
        message: "successfully created",
      });
    }
  } catch (err) {
    const status = err.status || 500;
    res
      .status(status)
      .json({ error: err.message || "error while creating a person" });
  }
};

exports.getAllPersons = (req, res) => {
  try {
    if (persons.length === 0) {
      handleNotFoundError("No persons found");
    } else {
      res.status(200).json(persons);
    }
  } catch {
    const status = err.status || 500;
    res
      .status(status)
      .json({ error: err.message || "error while getting all persons" });
  }
};

exports.getPersonById = (req, res) => {
  try {
    let person = persons.find((person) => person.id == req.params.id);
    if (!person) {
      handleNotFoundError("Person not found");
    } else {
      res.status(200).json(person);
    }
  } catch (err) {
    const status = err.status || 500;
    res
      .status(status)
      .json({ error: err.message || "error while getting person" });
  }
};

exports.updatePerson = (req, res) => {
  try {
    let personIndex = persons.findIndex(
      (person) => person.id === req.params.id
    );
    if (personIndex >= 0) {
      const { error } = personSchema.validate(req.body);
      if (error) {
        handleValidationError(error.details[0].message);
      } else {
        const updatePerson = { ...req.body };
        updatePerson.id = persons[personIndex].id;
        persons[personIndex] = updatePerson;
        res.status(200).json({
          message: "successfully updated",
        });
      }
    } else {
      handleNotFoundError("Person not found");
    }
  } catch {
    const status = err.status || 500;
    res
      .status(status)
      .json({ error: err.message || "error while updating person" });
  }
};

exports.deletePerson = (req, res) => {
  try {
    let personIndex = persons.findIndex((p) => p.id === req.params.id);
    if (personIndex >= 0) {
      persons.splice(personIndex, 1);
      res.status(200).json({
        message: "Successfully deleted",
      });
    } else {
      handleNotFoundError("Person not found");
    }
  } catch {
    const status = err.status || 500;
    res
      .status(status)
      .json({ error: err.message || "error while deleting person" });
  }
};
