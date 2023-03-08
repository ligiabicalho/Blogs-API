const express = require('express');
const { userController } = require('../controllers');
const { validateName, validateEmail, validatePassword } = require('../middlewares/schemasValidate');

const router = express.Router();

router.post('/', validateName, validateEmail, validatePassword, userController.createUser);

module.exports = router;