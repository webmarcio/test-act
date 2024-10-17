import request from 'supertest';

import app from '../src/index';

describe('API Tests', () => {
  it('should return Server is running', async () => {
    const response = await request(app).get('/test-api');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: `Server is running on port ${process.env.PORT}` });
  });
});

