const Joi = require('joi');

const isRequired = (req, _res, next) => {
  const { error } = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(req.body);
  if (error) return next({ status: 400, message: 'Some required fields are missing' });
  return next();
};

const validateName = (req, _res, next) => {
  const { error } = Joi.string().min(8).validate(req.body.displayName);
  if (error) { 
    return next({ status: 400, 
      message: '"displayName" length must be at least 8 characters long' });  
    }
  return next();
};

const validateEmail = (req, _res, next) => {
  const { error } = Joi.string().email().min(8).validate(req.body.email);
  if (error) { 
    return next({ status: 400, 
      message: '"email" must be a valid email' });  
    }
  return next();
};

const validatePassword = (req, _res, next) => {
  const { error } = Joi.string().min(6).validate(req.body.password);
  if (error) { 
    return next({ status: 400, 
      message: '"password" length must be at least 6 characters long' });  
    }
  return next();
};

module.exports = { isRequired, validateName, validateEmail, validatePassword };