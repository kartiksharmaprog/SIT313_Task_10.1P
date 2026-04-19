const request = require('supertest');
const express = require('express');

const app = express();

// Mock routes
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.get('/error', (req, res) => {
  res.status(500).send('Internal Server Error');
});

app.get('/data', (req, res) => {
  res.json({ message: 'Hello', status: true });
});

describe('Advanced API Testing Suite', () => {

  // 1. Basic success test
  test('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  // 2. Response validation
  test('GET / should return correct response body', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('OK');
  });

  // 3. Error handling test
  test('GET /error should return 500', async () => {
    const res = await request(app).get('/error');
    expect(res.statusCode).toBe(500);
  });

  // 4. JSON response validation
  test('GET /data should return JSON with correct structure', async () => {
    const res = await request(app).get('/data');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe(true);
  });

  // 5. Consistency test (integration-like)
  test('Multiple requests should return consistent results', async () => {
    const res1 = await request(app).get('/');
    const res2 = await request(app).get('/');
    expect(res1.text).toBe(res2.text);
  });

  // 6. Performance sanity check
  test('Response time should be under 500ms', async () => {
    const start = Date.now();
    await request(app).get('/');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(500);
  });

});