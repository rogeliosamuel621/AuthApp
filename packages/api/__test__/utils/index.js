const {
  clearDatabase,
  dbClose,
  dbConnection,
  registerUser,
  registerUserAndGetToken,
} = require('./dbHandler');
const { FakeUser, token } = require('./fakeUser');

module.exports = {
  clearDatabase,
  dbClose,
  dbConnection,
  registerUser,
  registerUserAndGetToken,
  FakeUser,
  token,
};
