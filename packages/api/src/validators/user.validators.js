const { check } = require('express-validator');

const editProfileValidator = [check('email', 'Must be an email').isEmail()];

module.exports = {
  editProfileValidator,
};
