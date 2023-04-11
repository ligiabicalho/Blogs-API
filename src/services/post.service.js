const Sequelize = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');
// const CategoryService = require('./category.service');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

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

const createPost = async (title, content, categoryIds, userId) => {
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ title, content, userId }, 
      { transaction: t });
      console.log('newPost createPost', newPost);
      const postCategories = categoryIds.map((id) => {
        const postCategory = { postId: newPost.id, id };
        return postCategory;
      });
    await PostCategory.bulkCreate(postCategories, 
      { transaction: t });
    console.log('createPost newPost', newPost);
    return newPost;
  });
  return { error: null, message: result };
};

module.exports = { getAll, getById, createPost };