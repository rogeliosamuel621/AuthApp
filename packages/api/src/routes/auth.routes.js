const { Router } = require('express');
const router = Router();

const {
  registerController,
  loginController,
} = require('../controllers/auth.controllers');
const {
  registerValidator,
  loginValidator,
} = require('../validators/auth.validators');

router.post('/register', registerValidator, registerController);

router.post('/login', loginValidator, loginController);

module.exports = router;
