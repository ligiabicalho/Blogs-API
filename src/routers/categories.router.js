const express = require('express');
const { categoriesController } = require('../controllers');
const validateToken = require('../auth/validateJWT');
const { isRequiredCategoryName } = require('../middlewares/schemasValidate');

const router = express.Router();

router.post('/', validateToken, isRequiredCategoryName, categoriesController.createCategory);
router.get('/', validateToken, categoriesController.getAll);

module.exports = router;