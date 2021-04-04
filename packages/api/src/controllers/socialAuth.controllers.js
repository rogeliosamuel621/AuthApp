const User = require('../db/models/users.models');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../middlewares/');
const { JWT_SECRET, EXPIRES_IN } = require('../config');
const successMessage = require('../utils/successMessage');

async function facebookLoginController(req, res, next) {
  const { name, photo, email } = req.body;
  try {
    const checkEmail = await User.find({ email: email }, 'password _id');
    if (!checkEmail.length) {
      const user = new User({
        photo,
        name,
        email,
      });

      const newUser = await user.save();

      const payload = {
        ID: newUser._id,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });

      return successMessage(token, res, 'SUCCESS');
    }

    //if there are more than two
    if (checkEmail.length >= 2) {
      return next(new ErrorHandler(400, 'That email is already registered'));
    }

    //if one has password field, that means that he registered locally
    if (checkEmail[0].password) {
      return next(new ErrorHandler(400, 'That email is already registered'));
    }

    const payload = {
      ID: checkEmail[0]._id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });

    return successMessage(token, res, 'SUCCESS');
  } catch (err) {
    return next(new ErrorHandler(500, 'INTERNAL SERVER ERROR', err));
  }
}

module.exports = {
  facebookLoginController,
};
