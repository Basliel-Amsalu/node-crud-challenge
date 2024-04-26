const Joi = require("joi");

const personSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).max(130).required(),
  hobbies: Joi.array().items(Joi.string()).required(),
});

module.exports = { personSchema };
