const { PostService } = require('../services');

const getAll = async (_req, res, next) => {
  try {
    const posts = await PostService.getAll();
    return res.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, message } = await PostService.getById(id);
    if (error) {
      return res.status(error).json({ message });
    }
    return res.status(200).json(message);
  } catch (error) {
    return next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds, user } = req.body;
    console.log('consoller createPost user ', user);
    const { error, message } = await PostService.createPost(title, content, categoryIds, user.id);
    if (error) {
      return res.status(error).json({ message });
    }
    return res.status(201).json(message);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll, getById, createPost,
};