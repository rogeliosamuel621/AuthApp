const { validationResult } = require('express-validator');
const { ErrorHandler } = require('../middlewares');
const successMessage = require('../utils/successMessage');
const User = require('../db/models/users.models');

async function getProfileController(req, res, next) {
  const userID = req.user.ID;

  try {
    const user = await User.findById(userID, 'name phone email photo');

    if (!user) {
      return next(new ErrorHandler(401, 'UNAUTHORIZED', null));
    }

    return successMessage(user, res);
  } catch (err) {
    return next(new ErrorHandler(500, 'INTERNAL SERVER ERROR', err));
  }
}

async function editProfileController(req, res, next) {
  const errors = validationResult(req);
  const userID = req.user.ID;
  let band = false;

  if (!errors.isEmpty()) {
    return next(new ErrorHandler(400, 'WRONG DATA SCHEMA', errors.array()));
  }

  const { name, phone, email } = req.body;

  try {
    const user = await User.findById(userID, '_id email');

    if (user.email === email) band = true;

    if (!band) {
      const checkEmail = await User.find({ email: email }, '_id, email');

      if (checkEmail.length) {
        return next(
          new ErrorHandler(401, 'That email is already registered', null)
        );
      }
    }

    await User.findByIdAndUpdate(userID, {
      name,
      phone,
      email,
    });

    return successMessage(null, res, 'User updated');
  } catch (err) {
    return next(new ErrorHandler(500, 'INTERNAL SERVER ERROR', err));
  }
}

module.exports = {
  getProfileController,
  editProfileController,
};
