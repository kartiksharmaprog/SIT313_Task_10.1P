const request = require('supertest');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.get('/error', (req, res) => {
  res.status(500).send('Error');
});

describe('API Tests', () => {

  test('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('GET / should return correct response', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('OK');
  });

  test('GET /error should return 500', async () => {
    const res = await request(app).get('/error');
    expect(res.statusCode).toBe(500);
  });

});