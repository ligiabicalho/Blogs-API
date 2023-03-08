const { UserService } = require('../services');
const generateToken = require('../middlewares/generateToken');

const getAll = async (_req, res, next) => {
  try {
    const users = await UserService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { error, message } = await UserService.createUser(displayName, email, password, image);
    if (error) {
      return res.status(error).json({ message });
    }
    const payload = { email };
    const token = generateToken(payload);

    return res.status(201).json({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll, createUser,
};