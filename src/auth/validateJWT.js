const jwt = require('jsonwebtoken');
require('dotenv/config');
const { UserService } = require('../services');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserService.getByEmail(decoded.email);

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user;

    next();
  } catch (error) {
      error.status = 401;
      error.message = 'Expired or invalid token';
      return next(error);
  }
};