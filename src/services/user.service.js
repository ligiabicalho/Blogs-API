const { User } = require('../models');

const getAll = async () => {
  const users = await User.findAll({
  attributes: { exclude: ['password'] },
  });
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    const error = { status: 404, message: 'User does not exist' };
    return error;
  }
  return { status: 200, message: user };
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (displayName, email, password, image) => {
  const user = await getByEmail(email);
  if (user) {
    const error = { status: 409, message: 'User already registered' };
    return error;
  }

  const newUser = await User.create({ displayName, email, password, image });
  return { status: 201, message: newUser };
};

module.exports = { getAll, getById, getByEmail, createUser };