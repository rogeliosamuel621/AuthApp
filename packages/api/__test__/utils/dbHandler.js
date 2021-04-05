const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../src/db/models/users.models');
const { FakeUser } = require('../utils/fakeUser');

class DbHandler {
  constructor() {
    this.mongod = new MongoMemoryServer();
    this.uri = this.mongod.getUri();
  }

  async dbConnection() {
    await mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }

  async dbClose() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongod.stop();
  }

  async clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }

  async registerUser() {
    const mockUser = new FakeUser('adin@gmail.com', '123456');
    await User.create(mockUser);
  }
}

module.exports = new DbHandler();
