const App = require('../../src/App');
const req = require('supertest');
const { DBClose, DBConnection, FakeUser, token } = require('../utils/');
const { API_KEY } = require('../../src/config/');

describe('getProfile endpoint', () => {
  beforeAll(DBConnection);
  afterAll(DBClose);

  test('Should response 401, NO TOKEN PROVIDED', async (done) => {
    const res = await req(App).get('/api/profile').set('api_key', API_KEY);

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 200, EVERYTHING OK', async (done) => {
    const res = await req(App)
      .get('/api/profile')
      .set('api_key', API_KEY)
      .set('token', token);

    expect(res.status).toBe(200);
    done();
  });
});

describe('Edit profile endpoint', () => {
  beforeAll(DBConnection);
  afterAll(DBClose);

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
    const res = await req(App)
      .put('/api/profile')
      .set('api_key', API_KEY)
      .set('token', token)
      .send({
        name: 'test login',
        phone: '6677895463',
        email: 'rogeliosamuel621@gmail.com',
      });

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 200, EVERYTHING OK', async (done) => {
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
