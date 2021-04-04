const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  photo: { type: String, required: false, default: '' },
  name: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  email: { type: String, required: true },
  password: { type: String, required: false },
});

const User = model('users', userSchema);
module.exports = User;
