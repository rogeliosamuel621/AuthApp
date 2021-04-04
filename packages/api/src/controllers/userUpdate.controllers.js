const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const path = require('path');
const { v2 } = require('cloudinary');
const successMessage = require('../utils/successMessage');
const User = require('../db/models/users.models');
const { ErrorHandler } = require('../middlewares');

async function editPasswordController(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ErrorHandler(400, 'WRONG DATA SCHEMA', errors.array()));
  }

  const userID = req.user.ID;

  try {
    const user = await User.findById(userID, '_id password');

    const passwordsMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!passwordsMatch) {
      return next(new ErrorHandler(401, 'UNAUTHORIZED', null));
    }

    delete req.body.currentPassword;
    delete user.password;

    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

    await User.findByIdAndUpdate(userID, { password: hashedNewPassword });

    return successMessage(null, res, 'Password updated');
  } catch (err) {
    return next(new ErrorHandler(500, 'INTERNAL SERVER ERROR', err));
  }
}

async function uploadPhoto(req, res, next) {
  if (!req.file) {
    return next(new ErrorHandler(400, 'Only images are allowed', null));
  }

  const userID = req.user.ID;
  const url = path.join(__dirname, `../../upload/${req.file.originalname}`);

  try {
    v2.uploader.upload(url, async (err, result) => {
      if (err) return next(new ErrorHandler(500, 'INTERNAL SERVER ERROR', err));

      await User.findByIdAndUpdate(userID, { photo: result.url });

      return successMessage(result.url, res, 'Image uploaded');
    });
  } catch (err) {
    return next(new ErrorHandler(500, 'INTERNAL SERVER ERROR', err));
  }
}

async function removeProfilePic(req, res, next) {
  const userID = req.user.ID;

  try {
    await User.findByIdAndUpdate(userID, { photo: '' });

    return successMessage(
      null,
      res,
      'Your image has been removed successfully'
    );
  } catch (err) {
    return next(new ErrorHandler(500, 'INTERNAL SERVER ERROR', err));
  }
}

module.exports = {
  editPasswordController,
  uploadPhoto,
  removeProfilePic,
};
