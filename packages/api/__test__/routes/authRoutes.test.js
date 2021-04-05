const app = require('../../src/App');
const req = require('supertest');
const { FakeUser } = require('../utils/');
const {
  dbConnection,
  clearDatabase,
  dbClose,
  registerUser,
} = require('../utils/dbHandler');
const { API_KEY } = require('../../src/config/');

describe('Register endpoint', () => {
  beforeAll(dbConnection);
  afterAll(dbClose);
  beforeEach(clearDatabase);

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
    await registerUser();

    const fakeUser = new FakeUser('admim@gmail.com', '123456');

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
  beforeAll(dbConnection);
  afterAll(dbClose);
  beforeEach(clearDatabase);

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
    const fakeUser = new FakeUser('admin1@gmail.com', '123456');
    await registerUser();

    const res = await req(app)
      .post('/api/login')
      .set('api_key', API_KEY)
      .send(fakeUser);

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 401 WRONG PASSWORD', async (done) => {
    const fakeUser = new FakeUser('admin@gmail.com', '1234567');
    await registerUser();

    const res = await req(app)
      .post('/api/login')
      .set('api_key', API_KEY)
      .send(fakeUser);

    expect(res.status).toBe(401);
    done();
  });

  test('Should response 200 EVERYTHING OK', async (done) => {
    const fakeUser = new FakeUser('admin@gmail.com', '123456');
    await registerUser();

    const res = await req(app)
      .post('/api/login')
      .set('api_key', API_KEY)
      .send(fakeUser);

    expect(res.status).toBe(200);
    done();
  });
});
