const { Router } = require('express');
const upload = require('../utils/multer');
const { JWT_Auth } = require('../middlewares');
const { editPasswordValidator } = require('../validators/userUpdate.validator');
const {
  editPasswordController,
  uploadPhoto,
  removeProfilePic,
} = require('../controllers');
const router = Router();

router.put(
  '/profile/password',
  JWT_Auth,
  editPasswordValidator,
  editPasswordController
);

router.post('/profile/photo', JWT_Auth, upload.single('image'), uploadPhoto);

router.delete('/profile/photo', JWT_Auth, removeProfilePic);

module.exports = router;
