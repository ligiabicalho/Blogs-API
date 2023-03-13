const { BlogPost, User, Category } = require('../models');
const CategoryService = require('./category.service');

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({ where: { id },
include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
  if (!post) {
    return { error: 404, message: 'Post does not exist' };
  }
  return { error: null, message: post };
};

const createPost = async (title, content, categoyIds) => {
  const categories = await Promise.all(categoyIds.map(async (id) => {
    await CategoryService.getById(id);
  }));
  console.log(categories);
  const newPost = await BlogPost.create({ title, content, categoyIds });
  return { error: null, message: newPost };
};

module.exports = { getAll, getById, createPost };