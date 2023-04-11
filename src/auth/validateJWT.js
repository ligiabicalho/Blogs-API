const jwt = require('jsonwebtoken');
require('dotenv/config');
const { UserService } = require('../services');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.header('authorization'); // função q retorna o valor da chave do parâmetro
  // equivalente a const { authorization } = req.headers;
  
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  try {
    const decoded = jwt.verify(token, secret);
    const { dataValues } = await UserService.getByEmail(decoded.email);
    delete dataValues.password;
    if (!dataValues) { // precisa disso nesse projeto??
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = dataValues;
    next();
  } catch (err) {
      const error = { status: 401, message: 'Expired or invalid token' };
      return next(error);
  }
};