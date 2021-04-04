const { check } = require('express-validator');

const editPasswordValidator = [
  check('currentPassword', 'Must have at least 6 characters').isLength({
    min: 6,
  }),
  check('newPassword', 'Must have at least 6 characters').isLength({ min: 6 }),
];

module.exports = {
  editPasswordValidator,
};
