const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../src/db/models/users.models');
const { FakeUser } = require('../utils/fakeUser');
const bcryptjs = require('bcryptjs');

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

async function registerUser() {
  const mockUser = new FakeUser('admin@gmail.com', '123456');
  mockUser.password = await bcryptjs.hash(mockUser.password, 10);
  await User.create(mockUser);
}

module.exports = { dbConnection, dbClose, clearDatabase, registerUser };
