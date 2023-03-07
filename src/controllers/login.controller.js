const jwt = require('jsonwebtoken');
const { isRequired } = require('../middlewares/schemas');
const { UserService } = require('../services');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { type, message } = isRequired({ email, password });
    if (type) return res.status(400).json({ message });
    console.log('userService', UserService);
    const user = await UserService.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' }); 
    }

    const payload = {
    email: req.body.email,
    };

    const token = jwt.sign(payload, JWT_SECRET);

    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};