const app = require('../../src/App');
const req = require('supertest');
const { DBClose, DBConnection, FakeUser } = require('../utils/');
const { API_KEY } = require('../../src/config/');

describe('Register endpoint', () => {
  beforeAll(DBConnection);
  afterAll(DBClose);

  test('Should response 401 NO API_KEY PROVIDED', async (done) => {
    const res = await req(app).post('/api/register');

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 400 WRONG DATA SCHEMA', async (done) => {
    const fakeUser = new FakeUser('admim@gmail.c', '123');
    const res = await req(app)
      .post('/api/register')
      .set('api_key', API_KEY)
      .send(fakeUser);

    expect(res.status).toBe(400);
    done();
  });

  test('Should response 400 SAME EMAIL', async (done) => {
    const fakeUser = new FakeUser(
      'rogeliosamuel621',
      'rogeliosamuel621@gmail.com',
      '123456'
    );
    const res = await req(app)
      .post('/api/register')
      .set('api_key', API_KEY)
      .send(fakeUser);

    expect(res.status).toBe(400);
    done();
  });

  test('Should response 200 EVERYTHING OK', async (done) => {
    const fakeUser = new FakeUser();
    const res = await req(app)
      .post('/api/register')
      .set('api_key', API_KEY)
      .send(fakeUser);
    expect(res.status).toBe(200);
    done();
  });
});

describe('Login endpoint', () => {
  beforeAll(DBConnection);
  afterAll(DBClose);

  test('Should response 401 NO API_KEY PROVIDED', async (done) => {
    const res = await req(app).post('/register');

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 400 WRONG DATA SCHEMA', async (done) => {
    const fakeUser = new FakeUser('admim@gmail.c', '123');
    const res = await req(app)
      .post('/api/login')
      .set('api_key', API_KEY)
      .send(fakeUser);

    expect(res.status).toBe(400);
    done();
  });

  test('Should response 401 WRONG EMAIL', async (done) => {
    const fakeUser = new FakeUser('rogeliosamuel62@gmail.com', '123456');
    const res = await req(app)
      .post('/api/login')
      .set('api_key', API_KEY)
      .send(fakeUser);

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 401 WRONG PASSWORD', async (done) => {
    const fakeUser = new FakeUser('testLogin@gmail.com', '12345678');
    const res = await req(app)
      .post('/api/login')
      .set('api_key', API_KEY)
      .send(fakeUser);

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 200 EVERYTHING OK', async (done) => {
    const fakeUser = new FakeUser('admin@gmail.com', '123456');
    const res = await req(app)
      .post('/api/login')
      .set('api_key', API_KEY)
      .send(fakeUser);

    expect(res.status).toBe(200);
    done();
  });
});
