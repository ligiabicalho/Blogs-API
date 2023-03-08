const express = require('express');
const { loginController } = require('../controllers');
const { isRequired } = require('../middlewares/schemasValidate');

const router = express.Router();

router.post('/', isRequired, loginController);

module.exports = router;