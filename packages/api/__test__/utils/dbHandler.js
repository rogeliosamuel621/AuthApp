const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../src/db/models/users.models');
const { FakeUser } = require('../utils/fakeUser');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../src/config/');

mongod = new MongoMemoryServer();

async function dbConnection(done) {
  const uri = await mongod.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  done();
}

async function dbClose(done) {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
  done();
}

async function clearDatabase() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}

async function registerUser(email = 'admin@gmail.com', pass = '123456') {
  const mockUser = new FakeUser(email, pass);
  mockUser.password = await bcryptjs.hash(mockUser.password, 10);
  await User.create(mockUser);
}

async function registerUserAndGetToken(
  username = 'admin',
  email = 'admin@gmail.com'
) {
  try {
    const user = new User({
      username: username,
      email: email,
      password: await bcryptjs.hash('123456', 10),
    });

    await user.save();

    const token = jwt.sign({ ID: user._id }, JWT_SECRET);

    return token;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  dbConnection,
  dbClose,
  clearDatabase,
  registerUser,
  registerUserAndGetToken,
};
