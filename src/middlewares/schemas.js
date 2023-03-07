const Joi = require('joi');

const isRequired = (body) => {
  const { error } = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(body);
  if (error) return { type: 'BAD_REQUEST', message: 'Some required fields are missing' };
  return { type: null, message: '' };
};

module.exports = { isRequired };