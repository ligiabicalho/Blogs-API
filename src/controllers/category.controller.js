const { CategoryService } = require('../services');

const getAll = async (_req, res, next) => {
  try {
    const categories = await CategoryService.getAll();
    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { error, message } = await CategoryService.createCategory(name);
    if (error) return res.status(error).json({ message });
    return res.status(201).json(message);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  createCategory,
};