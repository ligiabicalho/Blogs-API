const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};