const { loginController, registerController } = require('./auth.controllers');
const {
  editPasswordController,
  uploadPhoto,
  removeProfilePic,
} = require('./userUpdate.controllers');
const {
  getProfileController,
  editProfileController,
} = require('./user.controllers');

const { facebookLoginController } = require('./socialAuth.controllers');

module.exports = {
  loginController,
  registerController,
  getProfileController,
  editProfileController,
  editPasswordController,
  uploadPhoto,
  removeProfilePic,
  facebookLoginController,
};
