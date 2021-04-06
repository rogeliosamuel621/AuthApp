const App = require('../../src/App');
const req = require('supertest');
const {
  dbConnection,
  clearDatabase,
  dbClose,
  registerUserAndGetToken,
  registerUser,
} = require('../utils/dbHandler');
const { API_KEY } = require('../../src/config/');

describe('getProfile endpoint', () => {
  beforeAll(dbConnection);
  afterAll(dbClose);
  beforeEach(clearDatabase);

  test('Should response 401, NO TOKEN PROVIDED', async (done) => {
    const res = await req(App).get('/api/profile').set('api_key', API_KEY);

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 200, EVERYTHING OK', async (done) => {
    const token = await registerUserAndGetToken();

    const res = await req(App)
      .get('/api/profile')
      .set('api_key', API_KEY)
      .set('token', token);

    expect(res.status).toBe(200);
    done();
  });
});

describe('Edit profile endpoint', () => {
  beforeAll(dbConnection);
  afterAll(dbClose);
  beforeEach(clearDatabase);

  test('Should response 401, NO TOKEN PROVIDED', async (done) => {
    const res = await req(App)
      .put('/api/profile')
      .set('api_key', API_KEY)
      .send({
        name: 'test login',
        phone: '6677895463',
        email: 'testLogin@gmail.com',
      });

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 400, WRONG DATA SCHEMA', async (done) => {
    const token = await registerUserAndGetToken();

    const res = await req(App)
      .put('/api/profile')
      .set('api_key', API_KEY)
      .set('token', token)
      .send({
        name: '',
        phone: '6677895463',
        email: 'testLogin@gmail.c',
      });

    expect(res.status).toBe(400);
    done();
  });

  test('Should response 401, EMAIL ALREADY TAKEN', async (done) => {
    const token = await registerUserAndGetToken();
    await registerUser('admin2@gmail.com', '123456');

    const res = await req(App)
      .put('/api/profile')
      .set('api_key', API_KEY)
      .set('token', token)
      .send({
        name: 'test login',
        phone: '6677895463',
        email: 'admin2@gmail.com',
      });

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 200, EVERYTHING OK', async (done) => {
    const token = await registerUserAndGetToken();

    const res = await req(App)
      .put('/api/profile')
      .set('api_key', API_KEY)
      .set('token', token)
      .send({
        name: 'admin',
        phone: '6671624203',
        email: 'admin@gmail.com',
      });

    expect(res.status).toBe(200);
    done();
  });
});
