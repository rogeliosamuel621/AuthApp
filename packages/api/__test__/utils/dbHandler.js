const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { MONGO_URI } = require('../../src/config/');
const User = require('../../src/db/models/users.models');

const DBConnection = async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

const DBClose = async (done) => {
  await User.findOneAndDelete({ email: 'test@gmail.com' });

  await mongoose.connection.close();
  done();
};

const DBCloseAndChangePassword = async (done) => {
  const pass = await bcrypt.hash('123456', 10);
  await User.findByIdAndUpdate('5ff0b8e44d2b480a76f3d103', { password: pass });

  await mongoose.connection.close();
  done();
};

module.exports = {
  DBConnection,
  DBClose,
  DBCloseAndChangePassword,
};
