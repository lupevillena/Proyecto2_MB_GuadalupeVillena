const request = require('supertest');
const app = require('../src/app');

describe('MiniBlog API', () => {

  test('GET / debe responder 200', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('API MiniBlog funcionando');
  });

  test('GET /authors debe responder 200', async () => {
    const response = await request(app).get('/authors');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /authors/1 debe responder 200', async () => {
    const response = await request(app).get('/authors/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  test('GET /authors/999999 debe responder 404', async () => {
    const response = await request(app).get('/authors/999999');

    expect(response.statusCode).toBe(404);
  });

  test('POST /authors con nombre vacío debe responder 400', async () => {
    const response = await request(app)
      .post('/authors')
      .send({
        name: '',
        email: 'test@example.com',
        bio: 'Bio de prueba'
      });

    expect(response.statusCode).toBe(400);
  });

  test('POST /posts con título vacío debe responder 400', async () => {
    const response = await request(app)
      .post('/posts')
      .send({
        title: '',
        content: 'Contenido de prueba',
        author_id: 1,
        published: true
      });

    expect(response.statusCode).toBe(400);
  });

  test('GET /posts debe responder 200', async () => {
    const response = await request(app).get('/posts');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

});