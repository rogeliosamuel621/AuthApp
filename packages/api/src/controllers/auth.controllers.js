const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../middlewares/ErrorHandler');
const successMessage = require('../utils/successMessage');
const User = require('../db/models/users.models');
const { JWT_SECRET, EXPIRES_IN, MODE } = require('../config');

async function registerController(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ErrorHandler(400, 'WRONG DATA SCHEMA', errors.array()));
  }

  const { email, password } = req.body;

  try {
    const checkEmail = await User.findOne({ email: email }, 'email');

    if (checkEmail) {
      return res.status(401).json({
        message: 'That email is already registered',
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    user.save();

    return successMessage(null, res);
  } catch (err) {
    return next(new ErrorHandler(500, 'INTERNAL SERVER ERROR', err));
  }
}

async function loginController(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ErrorHandler(400, 'WRONG DATA SCHEMA', errors.array()));
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email }, 'password _id');

    if (!user) return next(new ErrorHandler(401, 'UNAUTHORIZED', null));

    const passwordsMatch = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!passwordsMatch) {
      return next(new ErrorHandler(401, 'UNAUTHORIZED', null));
    }

    delete req.body.password; /* works */

    const payload = {
      ID: user._id,
    };

    const token = jwt.sign(
      payload,
      JWT_SECRET,
      MODE === 'dev' ? null : { expiresIn: EXPIRES_IN }
    );

    return successMessage(token, res);
  } catch (err) {
    return next(new ErrorHandler(500, 'INTERNAL SERVER ERROR', err));
  }
}

module.exports = {
  registerController,
  loginController,
};
