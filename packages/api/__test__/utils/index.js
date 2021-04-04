const {
  DBClose,
  DBConnection,
  DBCloseAndChangePassword,
} = require('./dbHandler');
const { FakeUser, token } = require('./fakeUser');

module.exports = {
  DBClose,
  DBConnection,
  FakeUser,
  DBCloseAndChangePassword,
  token,
};
