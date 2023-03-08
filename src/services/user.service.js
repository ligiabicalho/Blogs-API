const { User } = require('../models');

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (displayName, email, password, image) => {
  const user = await getByEmail(email);
  if (user) {
    return { error: 409, message: 'User already registered' }; 
  }

  const newUser = await User.create({ displayName, email, password, image });
  return { error: null, message: newUser };
};

module.exports = { getByEmail, createUser, getAll };