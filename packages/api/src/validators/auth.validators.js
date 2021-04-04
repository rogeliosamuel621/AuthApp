const { check } = require('express-validator');

const registerValidator = [
  check('email', 'Must be an email').isEmail(),
  check('password', 'Must have at least 6 characters').isLength({ min: 6 }),
];

const loginValidator = [
  check('email', 'Must be an email').isEmail(),
  check('password', 'Must have at least 6 characters').isLength({ min: 6 }),
];

module.exports = {
  registerValidator,
  loginValidator,
};
