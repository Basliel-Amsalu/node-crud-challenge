const uuid = require("uuid");
const personSchema = require("../models/personModel");
const persons = require("../db/db");

exports.createPerson = (req, res) => {
  try {
    const { error } = personSchema.validate(req.body);
    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.status = 400;
      throw validationError;
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
      const notFoundError = new Error("No persons found");
      notFoundError.status = 404;
      throw notFoundError;
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
      const notFoundError = new Error("Person not found");
      notFoundError.status = 404;
      throw notFoundError;
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
        const validationError = new Error(error.details[0].message);
        validationError.status = 400;
        throw validationError;
      } else {
        const updatePerson = { ...req.body };
        updatePerson.id = persons[personIndex].id;
        persons[personIndex] = updatePerson;
        res.status(200).json({
          message: "successfully updated",
        });
      }
    } else {
      const notFoundError = new Error("Person not found");
      notFoundError.status = 404;
      throw notFoundError;
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
      const notFoundError = new Error("Person not found");
      notFoundError.status = 404;
      throw notFoundError;
    }
  } catch {
    const status = err.status || 500;
    res
      .status(status)
      .json({ error: err.message || "error while deleting person" });
  }
};
