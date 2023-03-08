const express = require('express');
const { userController } = require('../controllers');
const { validateName, validateEmail, validatePassword } = require('../middlewares/schemasValidate');
const validateToken = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateName, validateEmail, validatePassword, userController.createUser);

router.get('/', validateToken, userController.getAll);

module.exports = router;