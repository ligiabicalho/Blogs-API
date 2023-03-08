const { UserService } = require('../services');
const generateToken = require('../middlewares/generateToken');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' }); 
    }

    const payload = { email: req.body.email };
    const token = generateToken(payload);

    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};