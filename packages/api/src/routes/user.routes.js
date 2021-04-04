const { Router } = require('express');
const { editProfileValidator } = require('../validators/user.validators');
const {
  getProfileController,
  editProfileController,
} = require('../controllers/');
const router = Router();

const { JWT_Auth } = require('../middlewares');

router.get('/profile', JWT_Auth, getProfileController);

router.put('/profile', JWT_Auth, editProfileValidator, editProfileController);

module.exports = router;
