const request = require('supertest');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

test('GET / should return 200', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
});