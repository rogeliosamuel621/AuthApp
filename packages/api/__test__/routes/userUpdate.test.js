const App = require('../../src/App');
const req = require('supertest');
const {
  dbConnection,
  clearDatabase,
  dbClose,
  registerUserAndGetToken,
} = require('../utils/');
const { API_KEY } = require('../../src/config/');

describe('Edit password controller endpoint', () => {
  beforeAll(dbConnection);
  afterAll(dbClose);
  beforeEach(clearDatabase);

  test('Should response 401, NO TOKEN PROVIDED', async (done) => {
    const res = await req(App)
      .put('/api/profile/password')
      .set('api_key', API_KEY)
      .send({
        currentPassword: '123456',
        newPassword: '789456',
      });

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 401, WRONG PASSWORD', async (done) => {
    const token = await registerUserAndGetToken();

    const res = await req(App)
      .put('/api/profile/password')
      .set('api_key', API_KEY)
      .set('token', token)
      .send({
        currentPassword: '123456787878',
        newPassword: '789456',
      });

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 400, WRONG DATA SCHEMA', async (done) => {
    const token = await registerUserAndGetToken();

    const res = await req(App)
      .put('/api/profile/password')
      .set('api_key', API_KEY)
      .set('token', token)
      .send({
        currentPassword: '126',
        newPassword: '789',
      });

    expect(res.status).toBe(400);
    done();
  });

  test('Should response 200, EVERYTHING OK', async (done) => {
    const token = await registerUserAndGetToken();

    const res = await req(App)
      .put('/api/profile/password')
      .set('api_key', API_KEY)
      .set('token', token)
      .send({
        currentPassword: '123456',
        newPassword: '789456',
      });

    expect(res.status).toBe(200);
    done();
  });
});

describe('remove profile pic', () => {
  beforeAll(dbConnection);
  afterAll(dbClose);
  beforeEach(clearDatabase);

  test('Should response 401, NO TOKEN PROVIDED', async (done) => {
    const res = await req(App)
      .delete('/api/profile/photo')
      .set('api_key', API_KEY);

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 200, EVERYTHING OK', async (done) => {
    const token = await registerUserAndGetToken();

    const res = await req(App)
      .delete('/api/profile/photo')
      .set('api_key', API_KEY)
      .set('token', token);

    expect(res.status).toBe(200);
    done();
  });
});
