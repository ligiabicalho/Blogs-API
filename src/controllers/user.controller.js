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

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, message } = await UserService.getById(id);
    if (status === 404) {
      return res.status(status).json({ message });
    }
    delete message.dataValues.password; // pode deletar no service, com o att exclude. Qual o mais adequado???
    return res.status(status).json(message);
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { status, message } = await UserService.createUser(displayName, email, password, image);
    console.log('create user consoller: status, message', status, message);
    if (status === 409) {
      return res.status(status).json({ message });
    }
    const payload = { email };
    const token = generateToken(payload);

    return res.status(status).json({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll, getById, createUser,
};