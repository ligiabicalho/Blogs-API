const { Category } = require('../models');

// const getAll = async () => {
//   const category = await Category.findAll();
//   return category;
// };

// const getByName = async (name) => {
//   const category = await Category.findByOne({ where: { name } });
//   return category;
// };

const createCategory = async (name) => {
  // const category = await getByName(name);
  // if (category) {
  //   const error = { status: 409, message: 'Category already registered' };
  //   return error;
  // }
  const newCategory = await Category.create({ name });
  return { status: 201, message: newCategory };
};

module.exports = { createCategory };