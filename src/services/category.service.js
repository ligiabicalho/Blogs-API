const { Category } = require('../models');

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getByName = async (name) => {
  const category = await Category.findOne({ where: { name } });
  return category;
};

const createCategory = async (name) => {
  const category = await getByName(name);
  if (category) {
    return { error: 409, message: 'Category already registered' };
  }
  const newCategory = await Category.create({ name });
  return { error: null, message: newCategory };
};

module.exports = { getAll, createCategory };