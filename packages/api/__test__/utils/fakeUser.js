class FakeUser {
  constructor(email, password) {
    this.email = email || 'test@gmail.com';
    this.password = password || '123456';
  }
}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjVmZjBiOGU0NGQyYjQ4MGE3NmYzZDEwMyIsImlhdCI6MTYwOTYxMTUwNH0.i6Dwhhi73ILMfLZNL8oipR8iACf_Cyr-FlIRy-jeVHs';

module.exports = {
  FakeUser,
  token,
};
